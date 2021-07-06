import Head from "next/head";
import { Fragment } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const router = useRouter();
  const addMeetupHandler = async (data) => {
    await axios.post("/api/new-meetup", data);
    router.replace("/");
  };
  return (
    <Fragment>
      <Head>
        <title>Add a new meetup</title>
        <meta name="description" content="Add a meetup" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />;
    </Fragment>
  );
};

export default NewMeetupPage;
