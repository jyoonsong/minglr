import React from "react";
import User from "../components/User";

function renderUsers(user) {
    return <User key={user.id} 
                firstName={user.first_name} 
                lastName={user.last_name} 
                affiliation={user.affiliation}
                />
}

function Greet({ users }) { 
  return (
    <div>
        <h3>Greet</h3>
        <div>
            {users.map(renderUsers)}
        </div>
    </div>
)}

export default Greet;