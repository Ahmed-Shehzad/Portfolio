import { ReactNode } from "react";

interface ContactItem {
  icon: string;
  label: string;
  value: string | ReactNode;
}

interface ContactDetailsProps {
  showLinks?: boolean;
}

export function ContactDetails({ showLinks = true }: Readonly<ContactDetailsProps>) {
  const getContactData = (): ContactItem[] => {
    const baseData: ContactItem[] = [
      {
        icon: "📍",
        label: "Address",
        value: showLinks ? (
          <a
            href="https://www.google.com/maps/search/?api=1&query=Kärntner+Straße+2,+Wiesbaden,+65187,+Germany"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
          >
            Kärntner Straße 2<br />
            Wiesbaden, 65187
            <br />
            Germany
          </a>
        ) : (
          <span className="text-gray-600">
            Kärntner Straße 2<br />
            Wiesbaden, 65187
            <br />
            Germany
          </span>
        ),
      },
      {
        icon: "📱",
        label: "Phone",
        value: showLinks ? (
          <a
            href="tel:+4917623378452"
            className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
          >
            +49 176 233 78 452
          </a>
        ) : (
          "+49 176 233 78 452"
        ),
      },
      {
        icon: "📧",
        label: "Email",
        value: showLinks ? (
          <a
            href="mailto:ahmedshehzad786@gmail.com"
            className="text-gray-600 transition-colors hover:text-blue-600 hover:underline"
          >
            ahmedshehzad786@gmail.com
          </a>
        ) : (
          "ahmedshehzad786@gmail.com"
        ),
      },
    ];

    // Add additional fields only for resume (where showLinks is typically true)
    if (showLinks) {
      baseData.push(
        {
          icon: "🎂",
          label: "Date / Place of birth",
          value: "20.07.1993 — Lahore",
        },
        {
          icon: "🏳️",
          label: "Residence Permit",
          value: "Permanent Residence - Deutschland",
        }
      );
    }

    return baseData;
  };

  const contactData = getContactData();

  return (
    <>
      <h4 className="mt-6 flex items-center gap-2 font-semibold text-green-500">
        <span>📋</span> {showLinks ? "Details" : "Contact Details"}
      </h4>
      <div className="mt-3 space-y-3 text-xs">
        {contactData.map((contact) => (
          <ContactItem key={contact.label} {...contact} />
        ))}
      </div>
    </>
  );
}

function ContactItem({ icon, label, value }: Readonly<ContactItem>) {
  return (
    <div className="flex items-start gap-2">
      <span>{icon}</span>
      <div>
        <div className="font-medium text-gray-800">{label}</div>
        <div className="text-gray-600">{value}</div>
      </div>
    </div>
  );
}
