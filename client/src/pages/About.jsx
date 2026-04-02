import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-112.5" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse illo
            nulla sit assumenda autem voluptatibus distinctio non, commodi,
            magni exercitationem nesciunt cumque voluptate sequi eligendi?Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse illo
            nulla sit assumenda autem voluptatibus distinctio non, commodi,
            magni exercitationem nesciunt cumque voluptate sequi eligendi?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste ipsum
            nobis dolorem neque sed fugiat porro atque omnis quibusdam quo
            aliquam expedita tempora, deserunt dignissimos.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse illo
            nulla sit assumenda autem voluptatibus distinctio non, commodi,
            magni exercitationem nesciunt cumque voluptate sequi eligendi?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero itaque cum ipsa perferendis, quisquam eum at ipsam corrupti ad aspernatur? Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint. Numquam vitae nobis laborum libero quidem hic dicta nesciunt et.</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 flex sm:py-20 flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex sm:py-20 flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 flex sm:py-20 flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
