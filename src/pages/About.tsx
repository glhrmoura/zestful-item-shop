
import React from 'react';
import { Layout } from '../components/Layout';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">About ZestShop</h1>
          
          <p className="text-lg text-gray-700 mb-6">
            ZestShop is a premier online marketplace dedicated to bringing you high-quality products with exceptional customer service.
          </p>
          
          <p className="text-gray-600 mb-8">
            Founded in 2023, our mission is to make shopping enjoyable, convenient, and reliable. We carefully curate our product selection to ensure that everything we offer meets our high standards for quality and value.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary">Quality</h3>
              <p className="text-gray-600">
                We never compromise on quality. Every product in our store is carefully selected and tested to ensure it meets our high standards.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the heart of everything we do. We're committed to providing an exceptional shopping experience from start to finish.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary">Integrity</h3>
              <p className="text-gray-600">
                We believe in transparent business practices and honest communication. What you see is what you get, no hidden fees or surprises.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-primary">Innovation</h3>
              <p className="text-gray-600">
                We constantly strive to improve our product offerings and services, embracing new technologies and ideas to serve you better.
              </p>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-8">
            Behind ZestShop is a dedicated team of professionals passionate about creating the best online shopping experience. From our product curators to our customer service representatives, everyone is committed to excellence.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600">
            If you have any questions or feedback, we'd love to hear from you! Visit our <a href="/contact" className="text-primary hover:underline">Contact Page</a> or email us at support@zestshop.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
