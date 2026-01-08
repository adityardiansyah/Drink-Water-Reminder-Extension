import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Configuration default is a number >= 1', async () => {
		const cfg = vscode.workspace.getConfiguration('drinkWaterReminder');
		const val = cfg.get<number>('intervalMinutes');
		assert.ok(typeof val === 'number', 'intervalMinutes should be a number');
		assert.ok((val ?? 0) >= 1, 'intervalMinutes should be >= 1');
	});

	test('Update configuration and restore', async () => {
		const cfg = vscode.workspace.getConfiguration('drinkWaterReminder');
		const original = cfg.get<number>('intervalMinutes');
		await cfg.update('intervalMinutes', 5, vscode.ConfigurationTarget.Global);
		// re-fetch configuration so we observe the applied change
		const updated = vscode.workspace.getConfiguration('drinkWaterReminder').get<number>('intervalMinutes');
		assert.strictEqual(updated, 5);
		// restore
		await cfg.update('intervalMinutes', original, vscode.ConfigurationTarget.Global);
	});

	test('Localized messages for several locales', () => {
		// import helper on-demand to avoid early activation side-effects
		const { getLocalizedMessage } = require('../extension');
		assert.strictEqual(getLocalizedMessage('en'), '💧 Time to drink water! Keep yourself healthy.');
		assert.strictEqual(getLocalizedMessage('id'), '💧 Waktunya minum air! Jangan lupa jaga kesehatan.');
		assert.strictEqual(getLocalizedMessage('es'), '💧 ¡Es hora de beber agua! Cuida tu salud.');
		assert.strictEqual(getLocalizedMessage('fr'), "💧 Il est temps de boire de l'eau ! Prenez soin de votre santé.");
	});
});
