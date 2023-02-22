# This app is for Admins only. It is a UI to create, update, and delete users. It is also for generating certificates

## Built with docker containers, react, redux toolkit, ExpressJS, and JSPDF.

The app has the ability to generate new users (also called members), update users, delete users, and delete entire groups. The app also has the ability to change all the roles of a given group. This feature is mainly for after a cohort is complete, the students' role should change from "participant" to "alumni".

Another feature of this app is that it can be used to generate certificates of completion for members, once they complete the workshop and their status has been changed to Alumni.

Included in this repository is a tutorial video for the facilitator who is running the workshop

---

To run the app locally, cd into the backend folder and run
`npm run dev` in the terminal. You will also need to change the API_URL in all of the 'Service' files under the 'features' directory.

If you have any questions or concerns, contact [Robbie Prokop](https://dhammadevs.com)

---

## To Do

- Change JWT storage from LocalStorage to something more secure
- fix the date on the generated certificate
- remove password submit from edit
- create a way to assign a facilitator to each group, then add that facilitator to the group members. One way could be to add the facilitator title as a foreign key to the group. I could make it a select menu, showing the Admins and have the facilitator be assigned to the group, just like the roles. The default could be null, and the selected could be the facilitator.id.
- bug with the facilitator. it's defaulting to Orly, but not actually changing when i submit a change. Need to fix it
