# 💧 Drink Water Reminder – VS Code Extension

**Drink Water Reminder** is a Visual Studio Code extension that helps developers **remember to drink water regularly while working**, so they can stay healthy and productive during long coding sessions.

This extension is **open source**, lightweight, and designed to be non-intrusive to your workflow.

---

## ✨ Features

- ⏰ **Automatic water drinking reminders** based on a time interval  
- ⚙️ **Configurable reminder interval** (in minutes)  
- 💬 **Native VS Code notifications**  
- ⌨️ **Manual command** to trigger a reminder instantly  
- 🚀 **Lightweight and performance-friendly**

---

## 📦 Installation

### From VS Code Marketplace
1. Open **Extensions** in VS Code (`Ctrl + Shift + X`)
2. Search for **Drink Water Reminder**
3. Click **Install**

### Manual (Development)

```bash
git clone https://github.com/adityardiansyah/Drink-Water-Reminder-Extension
cd drink-water-reminder-extension
npm install
code .
```
Press F5 to run the extension in development mode.

## ⚙️ Configuration

You can configure the reminder interval via VS Code Settings.

### Using Settings UI
1. Open Settings
2. Search for Drink Water Reminder
3. Set the reminder interval (in minutes)
``` bash
Using settings.json
{
  "drinkWaterReminder.interval": 30
}
```
Default value: 30 minutes

### ⌨️ Commands
This extension provides a manual command:

- 💧 **Remind Me to Drink Water Now**

How to use:
1. Press Ctrl + Shift + P
2. Type: Remind Me to Drink Water Now
3. Press Enter

## 🧠 Why This Extension?

Many developers forget to drink water because they are deeply focused on coding.
This extension was created as a simple and consistent reminder to help maintain healthy habits during work.

**A healthy developer is a productive developer.**

## 🛠 Built With
- TypeScript
- VS Code Extension API
- Node.js

## 🤝 Contributing
Contributions are welcome 🙌

How to contribute:
1. Fork this repository
2. Create a new branch (feature/your-feature-name)
3. Commit your changes
4. Open a Pull Request

Ideas for contribution:
- Water intake statistics
- Focus or idle detection
- Status bar indicator
- Custom reminder messages

## 📄 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute this software.

## 👤 Author
Aditya Ardiansyah
Developer & Product Builder

If you find this extension useful, please consider giving the repository a ⭐.

## ☕ Friendly Reminder
When the notification appears…
Drink some water first, then continue coding 💧😄