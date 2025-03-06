const ContactPage = () => {
  return (
    <div className="container">
      <h1 className="title">Contact Us</h1>
      <p className="text">Have any questions? Reach out to us!</p>
      <form className="form">
        <input type="text" placeholder="Your Name" className="input" />
        <input type="email" placeholder="Your Email" className="input" />
        <textarea
          placeholder="Your Message"
          className="textarea"
          rows={4}
        ></textarea>
        <button className="button">Send Message</button>
      </form>
    </div>
  );
};

export default ContactPage;
