<template>
  <main>
    <div class="conversation" id="conversation-pane">
      <div v-if="loading">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div v-if="conversation === []">
          <p>No messages yet</p>
        </div>
        <div v-else v-for="conversations in conversation">
          <div
            v-if="conversations.creator == userdata.user._id"
            class="message-container"
            id="messages-container"
          >
            <div class="message-sender">
              <div class="message-sender-text">
                <p class="message-sender-you">You</p>
                <p>{{ conversations.content }}</p>
              </div>
            </div>
          </div>
          <div v-else class="message-container">
            <div class="message-sender">
              <div class="message-sender-text">
                <p class="message-sender-you">{{ conversations.creator }}</p>
                <p>{{ conversations.content }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conversation-input">
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          id="message"
          v-model="content"
          placeholder="Send a Message..."
        />
        <input type="submit" value="Send" />
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { io } from "socket.io-client";
var socket = io.connect("http://localhost:8080");

export default {
  name: "Show Conversation",
  data() {
    return {
      conversation: [],
      content: "",
      userdata: "",
      loading: true,
      timeout: null,
      typing: false,
    };
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },

  async mounted() {
    if (this.cookies.get("token") !== null) {
      axios
        .create({ withCredentials: true })
        .get(`http://localhost:8080/api/v1/user/username`, {
          headers: { "x-access-token": this.cookies.get("token") },
        })
        .then(
          (response) => {
            console.log(response.data);
            this.userdata = response.data;
          },
          (err) => {
            console.log(err);
          }
        );

      await axios
        .create({ withCredentials: true })
        .get(
          `http://localhost:8080/api/v1/conversation/${this.$route.params.id}`,
          {
            headers: { "x-access-token": this.cookies.get("token") },
          }
        )
        .then(
          (response) => {
            console.log(response.data.messages);
            this.conversation = response.data.messages;
            this.loading = false;
          },
          (err) => {
            console.log(err);
          }
        );
      socket.on("channel-" + this.$route.params.id, (data) => {
        console.log("data received");
        if (data !== this.userdata.user._id) {
          this.conversation.push(data);
        }
        $("#conversation-pane").scrollTop(
          $("#conversation-pane")[0].scrollHeight
        );
      });
      socket.on("typing-" + this.$route.params.id, (data) => {
        console.log("typing received");
        console.log("data" + data);
        if (data !== this.userdata.user._id) {
          console.log("user " + data + " typing");
        } else {
          console.log("started typing");
        }
      });
      socket.on("nottyping-" + this.$route.params.id, (data) => {
        console.log("nottyping received");
        if (data !== this.userdata.user._id) {
          console.log("user " + data + " not typing");
          console.log(data);
        } else {
          console.log("stopped typing");
        }
      });
      if (this.loading == false) {
        $("#conversation-pane").scrollTop(
          $("#conversation-pane")[0].scrollHeight
        );
      }
      document.getElementById("message").addEventListener("keydown", (e) => {
        if (e.keyCode === 13) {
          return;
        }
        if (e.keyCode == 8) {
          return;
        }
        if (this.typing == false) {
          console.log("started typing");
          socket.emit("typing", {
            conversationId: this.$route.params.id,
            creator: this.userdata.user._id,
          });
          console.log("emiited");
          this.typing = true;
          this.timeout = setTimeout(this.timeoutFunction, 2000);
        } else {
          console.log("user" + this.userdata.user._id + "typing");
          clearTimeout(this.timeout);
          this.timeout = setTimeout(this.timeoutFunction, 2000);
        }
      });
    }
  },

  methods: {
    sendMessage() {
      if (this.content == "") {
        return;
      }

      axios.defaults.headers.common["x-access-token"] =
        this.cookies.get("token");
      axios
        .create({ withCredentials: true })
        .post(
          `http://localhost:8080/api/v1/conversation/${this.$route.params.id}`,
          {
            message: this.content,
          }
        )
        .then(
          (response) => {
            console.log(response.data);
            socket.emit("message", {
              conversationId: this.$route.params.id,
              content: this.content,
              creator: this.cookies.get("token"),
            });
            console.log("emitted to channel-" + this.$route.params.id);
            this.conversation.push({
              content: this.content,
              creator: this.userdata.user._id,
            });
            this.content = "";
          },
          (err) => {
            console.log(err);
          }
        );
      $("#conversation-pane").scrollTop(
        $("#conversation-pane")[0].scrollHeight
      );
    },
    getMessages() {
      axios
        .create({ withCredentials: true })
        .get(
          `http://localhost:8080/api/v1/conversation/${this.$route.params.id}`,
          {
            headers: { "x-access-token": this.cookies.get("token") },
          }
        )
        .then(
          (response) => {
            this.conversation = response.data.messages;
            this.loading = false;
          },
          (err) => {
            console.log(err);
          }
        );
    },
    timeoutFunction() {
      this.typing = false;
      socket.emit("nottyping", {
        conversationId: this.$route.params.id,
        creator: this.userdata.user._id,
      });
    },
  },
};
</script>

<style>
</style>