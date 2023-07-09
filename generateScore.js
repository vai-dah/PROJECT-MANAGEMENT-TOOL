    var CLIENT_ID = '26749447268-vsage3jpq227o4qk0u6nqbjesn658kk1.apps.googleusercontent.com';

      var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
      var subjects =[];

      /**
       * Check if current user has authorized this application.
       */
      function checkAuth() {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES.join(' '),
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      function handleAuthResult(authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load client library.
          authorizeDiv.style.display = 'none';
          loadGmailApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      function handleAuthClick(event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          handleAuthResult);
        return false;
      }

      /**
       * Load Gmail API client library. List labels once client library
       * is loaded.
       */
      function loadGmailApi() {
        gapi.client.load('gmail', 'v1', listMessages);
      }

      /**
       * Print all Labels in the authorized user's inbox. If no labels
       * are found an appropriate message is printed.
       */
      function listLabels() {
        var request = gapi.client.gmail.users.labels.list({
          'userId': 'me'
        });

        request.execute(function(resp) {
          var labels = resp.labels;
          appendPre('Labels:');

          if (labels && labels.length > 0) {
            for (i = 0; i < labels.length; i++) {
              var label = labels[i];
              appendPre(label.name)
            }
          } else {
            appendPre('No Labels found.');
          }
        });
      }
       function getHeader(headers, index) {
                      var header = '';
                      $.each(headers, function(){
                        if(this.name === index){
                          header = this.value;
                        }
                      });
                      return header;
          }
       
       function listMessages() {
        var request = gapi.client.gmail.users.messages.list({
          'userId': 'me'
        });
      
        request.execute(function(resp) {
          var messages = resp.messages;
          appendPre('Messages:');

          if (messages && messages.length > 0) {
            for (i = 0; i < messages.length; i++) {
              var message = messages[i];
              var messageids = [];
              messageids.push(messages[i].id);
              getMessage('me', messages[i].id,function(data){
                
              
              subjects.push(getHeader(data.payload.headers, 'Subject'));

              });
              
            }
            
          } else {
            appendPre('No messages found.');
          }
        });
      }
// 

      /**
       * Append a pre element to the body containing the given message
       * as its text node.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
      }
    function getMessage(userId, messageId, callback) {
      var request = gapi.client.gmail.users.messages.get({
      'userId': userId,
      'id': messageId
    });
    request.execute(callback);
    }
    function logData(data){
    }
    var subjectArr = subjects;
function generateScore(projectName, maxScore){
  var counter =0;
  subjectArr.forEach((subject) => {
    // console.log(subject);
    var words = subject.split(" ");
    // console.log(words);
    words.forEach((word) => {
      if (word === projectName){
        counter++;
      }
    });
    // console.log(counter);
  });
  return counter/maxScore;
}