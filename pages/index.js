import { Fragment } from "react";
import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Meetups React</title>
        <meta name="description" content="List of meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

export const getStaticProps = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://admin:JNbLkoH95HK6UXIF@cluster0.1q90f.mongodb.net/meetups?retryWrites=true&w=majority"
  );

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();
  console.log(meetups);

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
        description: meetup.description,
      })),
    },
    revalidate: 2,
  };
};

// export const getServerSideProps = async (context) => {

//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: MEETUP_DUMMY,
//     },
//   };
// };

export default HomePage;
