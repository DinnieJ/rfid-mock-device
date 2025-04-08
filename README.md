# Mock device rfid

```bash
npm i

# Start application

node mock-socket.js
```

On startup, enter the OTP code you received on web client
After enter the code, now you will be able to send mock tag data

Check mock-data.json for tag data sample

```json
{"epcCode":"xxxx71923709123","header":"001023081238010","filter":"98102937070412","partition":"11019273091fd","company":"3120983109283","itemRef":"312980971251225","serialNumber":"31825712571209222"}
```