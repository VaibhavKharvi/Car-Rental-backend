const mongoose = require("mongoose");
const UserProfile = require("../models/UserProfile");

async function checkCollections() {
  try {
    // Check MongoDB connection
    const conn = mongoose.connection;
    if (conn.readyState !== 1) {
      console.log("MongoDB not connected. Current state:", conn.readyState);
      return;
    }

    console.log("MongoDB connected successfully");

    // Check if collection exists
    const collections = await conn.db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    console.log("Existing collections:", collectionNames);

    if (collectionNames.includes("userprofiles")) {
      console.log("UserProfile collection exists");

      // Check if collection has documents
      const count = await UserProfile.countDocuments();
      console.log(`UserProfile collection has ${count} documents`);

      if (count === 0) {
        console.log(
          "Collection is empty - this might be why it's not showing in Atlas"
        );

        // Insert test document to make collection visible
        const testUser = new UserProfile({
          userName: "testuser",
          email: "test@example.com",
          password: "testpassword",
          confirmPassword: "testpassword",
          userId: "test123",
        });
        await testUser.save();
        console.log("Inserted test document into UserProfile collection");
      }
    } else {
      console.log("UserProfile collection does not exist");
    }
  } catch (err) {
    console.error("Error checking collections:", err);
  } finally {
    mongoose.disconnect();
  }
}

checkCollections();
