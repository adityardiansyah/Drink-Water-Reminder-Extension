import * as vscode from 'vscode';

let interval: ReturnType<typeof setInterval> | undefined;

export function getLocalizedMessage(locale?: string) {
	const lang = (locale ?? 'id').toLowerCase();
	const primary = lang.split(/[-_]/)[0];
	const messages: Record<string, string> = {
		en: '💧 Time to drink water! Keep yourself healthy.',
		id: '💧 Waktunya minum air! Jangan lupa jaga kesehatan.',
		es: '💧 ¡Es hora de beber agua! Cuida tu salud.',
		fr: "💧 Il est temps de boire de l'eau ! Prenez soin de votre santé.",
		de: '💧 Zeit, Wasser zu trinken! Achte auf deine Gesundheit.',
		pt: '💧 Hora de beber água! Cuide da sua saúde.',
		zh: '💧 该喝水了！记得保持健康。',
		ja: '💧 水を飲む時間です！健康に気を付けてください。',
		ko: '💧 물을 마실 시간입니다! 건강을 챙기세요。'
	};
	return messages[primary] ?? messages['id'];
}

export function activate(context: vscode.ExtensionContext) {
	// Clear any existing interval (useful during extension reloads in development)
	if (interval) {
		clearInterval(interval);
		interval = undefined;
	}

	const showReminder = (context: vscode.ExtensionContext) => {
		const skipCount = context.globalState.get<number>('skipCount', 0);

		if (skipCount >= 3) {
			vscode.window.showInformationMessage("Waktunya Minum Sekarang", { modal: true }).then(() => {
				context.globalState.update('skipCount', 0);
			});
		} else {
			vscode.window.showInformationMessage(getLocalizedMessage(), { modal: true }, "Lewati", "Sudah Minum").then(selection => {
				if (selection === "Lewati") {
					context.globalState.update('skipCount', skipCount + 1);
				}
			});
		}
	};

	// helper to (re)start the timer with given minutes
	const startTimer = (minutes: number) => {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}

		// run immediately, then every `minutes`
		showReminder(context);
		interval = setInterval(() => showReminder(context), minutes * 60 * 1000);
	};

	// read configured minutes (default 30)
	const config = vscode.workspace.getConfiguration('waktunya-minum');
	let minutes = config.get<number>('intervalMinutes', 30);
	startTimer(minutes);

	// restart timer when configuration changes
	const configListener = vscode.workspace.onDidChangeConfiguration((e) => {
		if (e.affectsConfiguration('waktunya-minum.intervalMinutes')) {
			const newMin = vscode.workspace.getConfiguration('waktunya-minum').get<number>('intervalMinutes', 30);
			minutes = newMin;
			startTimer(minutes);
		}
	});

	// command to quickly set interval via input box
	const setIntervalCommand = vscode.commands.registerCommand('waktunya-minum.setInterval', async () => {
		const input = await vscode.window.showInputBox({
			prompt: 'Masukkan interval pengingat (menit)',
			value: String(minutes),
			validateInput: (value) => {
				const n = Number(value);
				if (!Number.isFinite(n) || n < 1) {
					return 'Masukkan angka bulat >= 1';
				}
				return null;
			}
		});

		if (input) {
			const n = Math.max(1, Math.round(Number(input)));
			await vscode.workspace.getConfiguration('waktunya-minum').update('intervalMinutes', n, vscode.ConfigurationTarget.Global);
			vscode.window.showInformationMessage(`Interval diubah menjadi ${n} menit`);
		}
	});

	context.subscriptions.push(configListener, setIntervalCommand, new vscode.Disposable(() => {
		if (interval) {
			clearInterval(interval);
			interval = undefined;
		}
	}));
}

export function deactivate() {
	if (interval) {
		clearInterval(interval);
		interval = undefined;
	}
}
