import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ContactDetails from "../contactDetails/ContactDetails";
import Contacts from "../contacts/Contacts";
import Pod from "../pod/Pod";
import PodDetails from "../podDetails/PodDetails";
import Pods from "../pods/Pods";
import Profile from "../profile/Profile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FullScreenDialog = () => {
  const { pathname } = useLocation();
  // const inPods = pathname === '/pods';
  const inContacts = pathname === "/contacts";
  const inContactDetails = pathname.includes("/contact/");
  const inPod = pathname.includes("/pod/");
  const inPodDetails =
    pathname.includes("/pod/") && pathname.includes("/details");
  const inPods = pathname === "/pods";
  const inProfile = pathname === "/profile";
  const [isContacts, setIsContacts] = React.useState(inContacts);
  const [isContactDetails, setIsContactDetails] =
    React.useState(inContactDetails);
  const [isPod, setIsPod] = React.useState(inPod);
  const [isProfile, setIsProfile] = React.useState(inProfile);
  const [isPodDetails, setIsPodDetails] = React.useState(inPodDetails);

  useEffect(() => {
    if (inPods) {
      setIsContacts(false);
      setIsContactDetails(false);
      setIsPod(false);
      setIsProfile(false);
    }
  }, [inPods]);

  useEffect(() => {
    if (inContacts || inContactDetails) return setIsContacts(true);
    return setIsContacts(false);
  }, [inContacts]);

  useEffect(() => {
    if (inContactDetails) return setIsContactDetails(true);
    return setIsContactDetails(false);
  }, [inContactDetails]);

  useEffect(() => {
    if (inPod || inPodDetails) return setIsPod(true);
    return setIsPod(false);
  }, [inPod]);

  useEffect(() => {
    if (inPodDetails) return setIsPodDetails(true);
    return setIsPodDetails(false);
  }, [inPodDetails]);

  useEffect(() => {
    if (inProfile) return setIsProfile(true);
    return setIsProfile(false);
  }, [inProfile]);

  // const inContacts = matchPath(pathname, {
  //   path: "/contacts",
  //   exact: true,
  // });

  // const inContactDetails = matchPath(pathname, {
  //   path: "/contact/:contactId",
  // });

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <React.Fragment>
      {!isContacts &&
        !isContactDetails &&
        !isPod &&
        !isProfile &&
        !isPodDetails && <Pods />}
      <Dialog fullScreen open={isContacts} TransitionComponent={Transition}>
        {!!isContacts && <Contacts />}
      </Dialog>
      <Dialog
        fullScreen
        open={isContactDetails}
        TransitionComponent={Transition}
      >
        {!!isContactDetails && <ContactDetails />}
      </Dialog>
      <Dialog fullScreen open={isPod} TransitionComponent={Transition}>
        {!!isPod && <Pod />}
      </Dialog>
      <Dialog fullScreen open={isProfile} TransitionComponent={Transition}>
        {!!isProfile && <Profile qr={pathname.includes("/profile/qr")} />}
      </Dialog>
      <Dialog fullScreen open={isPodDetails} TransitionComponent={Transition}>
        {!!isPodDetails && <PodDetails />}
      </Dialog>
    </React.Fragment>
  );
};

function useViewport() {
  // State to store the current viewport category ('mobile', 'tablet', 'desktop')
  const [viewport, setViewport] = useState("desktop");

  useEffect(() => {
    const determineViewport = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setViewport("mobile");
      } else if (width >= 600 && width < 1024) {
        setViewport("tablet");
      } else {
        setViewport("desktop");
      }
    };

    // Determine the viewport once on initial render
    determineViewport();

    // Add event listener for window resize
    window.addEventListener("resize", determineViewport);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", determineViewport);
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return viewport;
}

export default function Maintainance() {
  const viewport = useViewport();
  console.log({ viewport });

  // return (
  //   <SplitPane split="vertical" minSize={200} defaultSize={viewport === 'mobile' ? '100%' :300}>
  //     <Pods />
  //     <SplitPane split="vertical" minSize={200} defaultSize={viewport === 'desktop' ? '50%' : '100%'}>
  //       <Contacts />
  //       {viewport === 'desktop' && <ContactDetails />}
  //     </SplitPane>
  //   </SplitPane>
  // );

  return <FullScreenDialog />;
}
