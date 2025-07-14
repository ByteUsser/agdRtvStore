import React from 'react';
import '../styles/Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-container">
      <h2>Kontakt</h2>
      <p>Masz pytania? Skontaktuj się z nami!</p>
      
      <div className="contact-info">
        <h3>Dane kontaktowe</h3>
        <p><strong>Adres:</strong> ul. Ulica 123, 00-001 Kraków</p>
        <p><strong>Telefon:</strong> +48 123 456 789</p>
        <p><strong>Email:</strong> kontakt@electroRtvAgd.pl</p>
      </div>

      <div className="working-hours">
        <h3>Godziny otwarcia</h3>
        <p>Poniedziałek - Piątek: 8:00 - 18:00</p>
        <p>Sobota: 10:00 - 16:00</p>
        <p>Niedziela: Zamknięte</p>
      </div>
    </div>
  );
};

export default Contact;
