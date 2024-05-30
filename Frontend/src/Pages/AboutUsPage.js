import React from 'react'
import NavBar from '../components/Navbar'
import Footer from '../components/footer'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

  import profileimg1 from '../assets/profileimg1.jpg'
  import profileimg2 from '../assets/profileimg2.jpg'
function AboutUsPage() {
  return (
    <div className=' max-h-screen'>
    <NavBar>
      <h1 className=' mx-6 text-2xl'>About Us</h1>
     <div className='flex flex-col justify-around mt-6 xl:flex-row md:flex-row'>
    {/* card 1 */}
     <Card className="w-96 m-3">
      <CardHeader floated={false} className="h-80">
        <img src={profileimg1}
        alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Rampal Yadav
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
         Frontent Developer
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
      <Tooltip content="Connect">
        <Typography
          as="a"
          href="https://www.linkedin.com/in/rampal-yadav/"
          variant="lead"
          color="blue"
          textGradient
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="https://github.com/rampalyadav0001"
          variant="lead"
          color="blue"
          textGradient
        >
          <FontAwesomeIcon icon={faGithub} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="#twitter"
          variant="lead"
          color="light-blue"
          textGradient
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="https://www.instagram.com/rampal_yadav_001/?hl=en"
          variant="lead"
          color="purple"
          textGradient
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Typography>
      </Tooltip>
    </CardFooter>
      
    </Card>
    {/* card 2 */}
    <Card className="w-96">
      <CardHeader floated={false} className="h-80">
        <img src={profileimg2} alt="profile-picture" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Ankit Mishra
        </Typography>
        <Typography color="blue-gray" className="font-medium" textGradient>
        Backened Developer
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
      <Tooltip content="Connect">
        <Typography
          as="a"
          href="https://www.linkedin.com/in/itsankitakm/"
          variant="lead"
          color="blue"
          textGradient
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="https://github.com/itsAnkitAkm"
          variant="lead"
          color="blue"
          textGradient
        >
          <FontAwesomeIcon icon={faGithub} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="https://x.com/Its_Ankit_Akm?t=hxoJUbbX3YgpLd96K8mpjw&s=08"
          variant="lead"
          color="light-blue"
          textGradient
        >
          <FontAwesomeIcon icon={faTwitter} />
        </Typography>
      </Tooltip>
      <Tooltip content="Follow">
        <Typography
          as="a"
          href="#"
          variant="lead"
          color="purple"
          textGradient
        >
          <FontAwesomeIcon icon={faInstagram} />
        </Typography>
      </Tooltip>
    </CardFooter>
    </Card>
     </div>
    </NavBar>
    <Footer></Footer>
  </div>
  )
}

export default AboutUsPage