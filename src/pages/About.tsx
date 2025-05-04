
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">About Campus Bite</h1>
          
          <div className="mb-12 relative">
            <img
              src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Students enjoying food at campus"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-lg">
              <div className="absolute bottom-0 left-0 p-6">
                <h2 className="text-white text-2xl font-bold mb-2">Simplifying Campus Dining</h2>
                <p className="text-white/90">Making student life easier, one meal at a time</p>
              </div>
            </div>
          </div>
          
          <div className="prose max-w-none">
            <h2>Our Mission</h2>
            <p>
              Campus Bite was founded with a simple mission: to make campus dining more convenient, 
              efficient, and enjoyable for university students. We understand the challenges of balancing 
              classes, extracurricular activities, and social life, which often leaves little time for waiting 
              in long canteen lines.
            </p>
            
            <h2>How We Started</h2>
            <p>
              Campus Bite began as a project by a group of computer science students who were frustrated with 
              the long waiting times at campus canteens during peak hours. What started as a class project 
              quickly gained traction among students and campus administrators, eventually evolving into the 
              full-featured platform it is today.
            </p>
            
            <h2>What We Offer</h2>
            <ul>
              <li>Easy browsing of menus from multiple campus canteens</li>
              <li>Convenient online ordering and payment options</li>
              <li>Time-saving pickup service that lets you skip the lines</li>
              <li>Special deals and loyalty rewards for frequent users</li>
              <li>Dietary preference filters to quickly find suitable food options</li>
              <li>Up-to-date information on opening hours and special menus</li>
            </ul>
            
            <h2>Our Team</h2>
            <p>
              Our dedicated team consists of developers, UX designers, and customer support specialists who are 
              committed to continuously improving the Campus Bite experience. Many of our team members are former 
              or current university students who understand the needs of our user base firsthand.
            </p>
            
            <h2>Partner With Us</h2>
            <p>
              Are you a campus canteen or food vendor interested in reaching more students and streamlining your 
              operations? We're always looking to expand our network of partner canteens. Get in touch with us to 
              learn more about the benefits of joining the Campus Bite platform.
            </p>
          </div>
          
          <div className="mt-12 flex justify-center gap-6">
            <Link to="/contact">
              <Button variant="default" className="bg-campus-purple hover:bg-campus-purple-dark">
                Contact Us
              </Button>
            </Link>
            <Link to="/canteens">
              <Button variant="outline" className="border-campus-purple text-campus-purple">
                Explore Canteens
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
