# 🌐 How to Switch Languages - Step-by-Step Guide

## 📱 **Desktop Version**

### **From English to German:**

1. **Look at the top navigation bar** (next to the main menu)
2. **Find the language switcher** showing: `🇬🇧 English (UK)`
3. **Click on it** to open the dropdown
4. **Select**: `🇩🇪 Deutsch (Deutschland)`
5. **Page will reload** in German at the same URL path

### **From German to English:**

1. **Look at the top navigation bar** (next to the main menu)
2. **Find the language switcher** showing: `🇩🇪 Deutsch (Deutschland)`
3. **Click on it** to open the dropdown
4. **Select**: `🇬🇧 English (UK)`
5. **Page will reload** in English at the same URL path

## 📱 **Mobile Version**

### **From English to German:**

1. **Tap the hamburger menu** (three lines) in the top-left corner
2. **Scroll down** to the bottom of the side menu
3. **Find the "Language" section**
4. **Tap the language switcher** showing: `🇬🇧 English (UK)`
5. **Select**: `🇩🇪 Deutsch (Deutschland)`
6. **Menu will close** and page reloads in German

### **From German to English:**

1. **Tap the hamburger menu** (three lines) in the top-left corner
2. **Scroll down** to the bottom of the side menu
3. **Find the "Language" section** (labeled "Sprache" in German)
4. **Tap the language switcher** showing: `🇩🇪 Deutsch (Deutschland)`
5. **Select**: `🇬🇧 English (UK)`
6. **Menu will close** and page reloads in English

## 🔍 **What to Look For**

### **Desktop Language Switcher Location:**

```
[Portfolio Logo] [Home] [Projects] [About] [Contact] [Resume] [🇬🇧 English (UK) ▼]
                                                           ↑
                                                    Language Switcher
```

### **Mobile Language Switcher Location:**

```
☰ Menu (tap to open)
└── Side Panel Opens
    ├── Home
    ├── Projects
    ├── About
    ├── Contact
    ├── Resume
    └── Language           ← Look for this section
        [🇬🇧 English (UK) ▼]  ← Language Switcher
```

## 🚨 **Troubleshooting**

### **If you don't see the language switcher:**

1. **Refresh the page** (Ctrl+R / Cmd+R)
2. **Clear browser cache** (Ctrl+Shift+R / Cmd+Shift+R)
3. **Check browser console** (F12) for any errors

### **If language switching doesn't work:**

1. **Ensure JavaScript is enabled** in your browser
2. **Try a different browser** (Chrome, Firefox, Safari)
3. **Check the URL changes** from `/en/...` to `/de/...` or vice versa

### **If you're stuck on one language:**

1. **Manually change the URL:**
   - English: `http://localhost:3000/en`
   - German: `http://localhost:3000/de`
2. **Use browser back/forward** buttons after switching

## ✅ **Expected Behavior**

### **URL Changes:**

- **English → German**: `/en/about` becomes `/de/about`
- **German → English**: `/de/resume` becomes `/en/resume`
- **Homepage**: `/en` becomes `/de` and vice versa

### **Visual Indicators:**

- **Current language** is shown in the switcher button
- **Available language** is shown in the dropdown
- **Flag icons** help identify languages quickly

### **Page Content:**

- **All text** changes to the selected language
- **Navigation labels** update accordingly
- **Page structure** remains the same

## 🎯 **Quick Test**

1. **Start at**: `http://localhost:3000/en`
2. **Click language switcher** → Select German
3. **Should redirect to**: `http://localhost:3000/de`
4. **Click language switcher again** → Select English
5. **Should redirect back to**: `http://localhost:3000/en`

---

## 💡 **Pro Tips**

- **Keyboard users**: Use Tab to navigate to language switcher, Space/Enter to open
- **Mobile users**: The language switcher is at the bottom of the mobile menu
- **Direct access**: You can always type `/en` or `/de` directly in the URL
- **Bookmarks**: Save both language versions as separate bookmarks

The language switcher should work seamlessly in both directions! 🎉
