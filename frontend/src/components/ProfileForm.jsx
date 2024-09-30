import React from "react";
import Header from "./Header";
import { useAuth } from "../context/UserContext";
import Spinner from "./Spinner";

// const bio_questions = [
//     "My all time favorite book is",
//     "I'll never read this book again",
//     "The best place to read is",
//     "My guilty pleasure read is",
//     "This trope gets me every time",
//     "My biggest literary hot take is",
//     "I'm convinced this character was based on me",
//     "My go-to comfort read is",
//     "The most underrated author is",
//     "This book completely changed my perspective",
// ]

// function BioQuestion() {
    
// }

// ProfileForm Component
function ProfileForm() {
    const { user, loading } = useAuth();

    if (loading) {
        return <Spinner />
    }

    return (
        <div>
            {
                !user.username ? (
                    <h1>Complete Your Profile</h1>
                ) : (
                    <div>
                        <Header />
                        <h1>Update Your Profile</h1>
                    </div>
                )
            }
            <form>
                <label>Username</label>
                <input type="text" value={user.username}></input>
                <label>First Name</label>
                <input type="text" value={user.fname}></input>
                <label>Last Name</label>
                <input type="text" value={user.lname}></input><br />
                {/* {bio_questions.map((question) => {
                    return (
                        <div>

                        </div>

                    )
                })} */}
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                <label for="vehicle1"> I have a bike</label><br />
                <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
                <label for="vehicle2"> I have a car</label><br />
                <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
                <label for="vehicle3"> I have a boat</label><br /><br />
            </form>
        </div>
    )
}

export default ProfileForm;