
import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call an API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent",
        description: "We've received your message and will get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mb-8">We'd love to hear from you. Please fill out the form or reach out via the contact details below.</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="w-full p-2 border rounded-md"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="w-full p-2 border rounded-md"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full p-2 border rounded-md"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="feedback">Feedback</option>
                    <option value="partner">Partnership Opportunities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full p-2 border rounded-md"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-campus-purple hover:bg-campus-purple-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
            
            <div>
              <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="text-campus-purple mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@campusbite.com" className="text-campus-purple hover:underline">
                        info@campusbite.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="text-campus-purple mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:+1-555-123-4567" className="text-campus-purple hover:underline">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="text-campus-purple mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Address</p>
                      <p>
                        Student Union Building<br />
                        Room 123, University Campus<br />
                        University City, State 12345
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="text-campus-purple mr-3 mt-1" size={20} />
                    <div>
                      <p className="font-medium">Support Hours</p>
                      <p>
                        Monday - Friday: 9:00 AM - 5:00 PM<br />
                        Saturday: 10:00 AM - 2:00 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Follow Us</h2>
                <p className="mb-4">Stay updated with Campus Bite news and offers by following us on social media.</p>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full hover:bg-blue-700 transition-colors"
                    aria-label="Facebook"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-sky-500 text-white flex items-center justify-center rounded-full hover:bg-sky-600 transition-colors"
                    aria-label="Twitter"
                  >
                    t
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-600 text-white flex items-center justify-center rounded-full hover:bg-pink-700 transition-colors"
                    aria-label="Instagram"
                  >
                    i
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-700 text-white flex items-center justify-center rounded-full hover:bg-blue-800 transition-colors"
                    aria-label="LinkedIn"
                  >
                    in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
