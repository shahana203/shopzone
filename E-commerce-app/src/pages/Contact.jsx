
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
} from "lucide-react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Banner */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-300 text-white py-16 px-6 text-center">
        <MessageCircle size={40} className="mx-auto mb-4" />

        <h1 className="text-4xl font-bold">
          Get in Touch
        </h1>

        <p className="text-blue-100 mt-3">
          We'd love to hear from you. How can we help?
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Contact Information */}
          <div className="bg-blue-500 text-white rounded-2xl p-8">

            <h2 className="text-2xl font-bold mb-4">
              Contact Information
            </h2>

            <p className="text-blue-100 mb-8">
              Reach out to our team for questions or assistance.
            </p>

            <div className="space-y-7">

              <div className="flex items-start gap-4">
                <Phone size={22} />
                <div>
                  <h3 className="font-semibold">Phone</h3>
                  <p className="text-blue-100 text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail size={22} />
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-blue-100 text-sm">
                    support@shopzone.demo
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin size={22} />
                <div>
                  <h3 className="font-semibold">Address</h3>
                  <p className="text-blue-100 text-sm">
                    ShopZone, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8">

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Send Us a Message
            </h2>

            <p className="text-gray-500 mb-7">
              Fill in the form and we'll be happy to help.
            </p>

            {submitted && (
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                Thank you! Your demo message has been submitted successfully.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Enter message subject"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  rows="5"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition"
              >
                <Send size={18} />
                Send Message
              </button>

            </form>

          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
