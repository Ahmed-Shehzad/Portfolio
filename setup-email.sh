#!/bin/bash

# Contact Form Email Setup Script
# This script helps you set up email functionality for your portfolio contact form

echo "🚀 Portfolio Contact Form Email Setup"
echo "====================================="
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📋 Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local file"
else
    echo "📋 .env.local already exists"
fi

echo ""
echo "📧 Email Configuration Setup"
echo "============================"
echo ""
echo "Please choose your email provider:"
echo "1. Gmail (recommended)"
echo "2. Outlook/Office 365"
echo "3. Yahoo Mail"
echo "4. Custom SMTP"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📧 Gmail Setup Selected"
        echo "======================"
        echo ""
        echo "To use Gmail, you need to:"
        echo "1. Enable 2-Factor Authentication on your Google Account"
        echo "2. Generate an App Password for Mail"
        echo ""
        echo "📋 Steps to generate App Password:"
        echo "1. Go to: https://myaccount.google.com/security"
        echo "2. Enable 2-Step Verification"
        echo "3. Go to: https://myaccount.google.com/apppasswords"
        echo "4. Select 'Mail' and generate password"
        echo "5. Copy the 16-character password"
        echo ""

        read -p "Enter your Gmail address: " email
        read -p "Enter your Gmail App Password (16 characters): " password

        # Update .env.local with Gmail settings
        sed -i.bak "s/SMTP_HOST=.*/SMTP_HOST=smtp.gmail.com/" .env.local
        sed -i.bak "s/SMTP_PORT=.*/SMTP_PORT=587/" .env.local
        sed -i.bak "s/SMTP_SECURE=.*/SMTP_SECURE=false/" .env.local
        sed -i.bak "s/SMTP_USER=.*/SMTP_USER=$email/" .env.local
        sed -i.bak "s/SMTP_PASS=.*/SMTP_PASS=$password/" .env.local
        sed -i.bak "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$email/" .env.local
        rm .env.local.bak

        echo "✅ Gmail configuration saved to .env.local"
        ;;
    2)
        echo ""
        echo "📧 Outlook/Office 365 Setup Selected"
        echo "=================================="

        read -p "Enter your Outlook email address: " email
        read -p "Enter your Outlook password: " password

        # Update .env.local with Outlook settings
        sed -i.bak "s/SMTP_HOST=.*/SMTP_HOST=smtp.office365.com/" .env.local
        sed -i.bak "s/SMTP_PORT=.*/SMTP_PORT=587/" .env.local
        sed -i.bak "s/SMTP_SECURE=.*/SMTP_SECURE=false/" .env.local
        sed -i.bak "s/SMTP_USER=.*/SMTP_USER=$email/" .env.local
        sed -i.bak "s/SMTP_PASS=.*/SMTP_PASS=$password/" .env.local
        sed -i.bak "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$email/" .env.local
        rm .env.local.bak

        echo "✅ Outlook configuration saved to .env.local"
        ;;
    3)
        echo ""
        echo "📧 Yahoo Mail Setup Selected"
        echo "=========================="

        read -p "Enter your Yahoo email address: " email
        read -p "Enter your Yahoo App Password: " password

        # Update .env.local with Yahoo settings
        sed -i.bak "s/SMTP_HOST=.*/SMTP_HOST=smtp.mail.yahoo.com/" .env.local
        sed -i.bak "s/SMTP_PORT=.*/SMTP_PORT=587/" .env.local
        sed -i.bak "s/SMTP_SECURE=.*/SMTP_SECURE=false/" .env.local
        sed -i.bak "s/SMTP_USER=.*/SMTP_USER=$email/" .env.local
        sed -i.bak "s/SMTP_PASS=.*/SMTP_PASS=$password/" .env.local
        sed -i.bak "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$email/" .env.local
        rm .env.local.bak

        echo "✅ Yahoo configuration saved to .env.local"
        echo "ℹ️  Note: Yahoo requires an App Password, not your regular password"
        ;;
    4)
        echo ""
        echo "📧 Custom SMTP Setup Selected"
        echo "==========================="

        read -p "Enter SMTP host (e.g., smtp.example.com): " host
        read -p "Enter SMTP port (usually 587 or 465): " port
        read -p "Use SSL/TLS? (true/false): " secure
        read -p "Enter your email address: " email
        read -p "Enter your email password: " password

        # Update .env.local with custom settings
        sed -i.bak "s/SMTP_HOST=.*/SMTP_HOST=$host/" .env.local
        sed -i.bak "s/SMTP_PORT=.*/SMTP_PORT=$port/" .env.local
        sed -i.bak "s/SMTP_SECURE=.*/SMTP_SECURE=$secure/" .env.local
        sed -i.bak "s/SMTP_USER=.*/SMTP_USER=$email/" .env.local
        sed -i.bak "s/SMTP_PASS=.*/SMTP_PASS=$password/" .env.local
        sed -i.bak "s/CONTACT_EMAIL=.*/CONTACT_EMAIL=$email/" .env.local
        rm .env.local.bak

        echo "✅ Custom SMTP configuration saved to .env.local"
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Email Configuration Complete!"
echo "==============================="
echo ""
echo "📋 Next steps:"
echo "1. Restart your development server: npm run dev"
echo "2. Test the contact form on your site"
echo "3. Check your email for test submissions"
echo ""
echo "📖 For more details, see: CONTACT_EMAIL_SETUP.md"
echo ""
echo "🔧 Troubleshooting:"
echo "- If emails don't send, check your credentials"
echo "- For Gmail, ensure you're using an App Password"
echo "- Check your spam/junk folder for test emails"
echo ""
echo "✨ Your contact form is now ready to send real emails!"
