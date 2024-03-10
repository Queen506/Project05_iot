const admin = require("firebase-admin");
const serviceAccount = require("./project05-json-firebase-adminsdk-qks5x-a615604c41.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function createData() {
  try {
    await db
      .collection("Iot")
      .doc("documentID1")
      .set({
        GPS: {},
        Lat: {},
        Long: {},
        Factor: {
          FactorID: 1,
          FactorName: "Temp",
        },
        Iot_Type: {
          Iot_TypeID: 1,
          Iot_TypeName: "Type1",
        },
        Iot_Equipment: {
          Iot_EquipmentID: 1,
          Iot_EquipmentName: "equipment1",
          Iot_TypeRef: db
            .collection("Iot")
            .doc("documentID1")
            .collection("Iot_Type")
            .doc("1"),
        },
        Iot_Detail: {
          Iot_DetailID: 1,
          ts: [admin.firestore.Timestamp.now()], // ใช้ Timestamp ปัจจุบัน, แทนที่ด้วย timestamp ที่ต้องการหากมี
          minValue: 10,
          avgValue: 15,
          maxValue: 20,
          Iot_EquipmentRef: db
            .collection("Iot")
            .doc("documentID1")
            .collection("Iot_Equipment")
            .doc("1"), // Reference to Iot_Equipment document
          FactorRef: db
            .collection("Iot")
            .doc("documentID1")
            .collection("Factor")
            .doc("1"), // Reference to Factor document
        },
      });
    await db
      .collection("Iot")
      .doc("documentID2")
      .set({
        GPS: {},
        Lat: {},
        Long: {},
        Factor: {
          FactorID: 2,
          FactorName: "Smoke",
        },
        Iot_Type: {
          Iot_TypeID: 2,
          Iot_TypeName: "Type2",
        },
        Iot_Equipment: {
          Iot_EquipmentID: 2,
          Iot_EquipmentName: "equipment2",
          Iot_TypeRef: db
            .collection("Iot")
            .doc("documentID2")
            .collection("Iot_Type")
            .doc("2"),
        },
        Iot_Detail: {
          Iot_DetailID: 1,
          ts: [admin.firestore.Timestamp.now()], // ใช้ Timestamp ปัจจุบัน, แทนที่ด้วย timestamp ที่ต้องการหากมี
          minValue: 10,
          avgValue: 15,
          maxValue: 20,
          Iot_EquipmentRef: db
            .collection("Iot")
            .doc("documentID2")
            .collection("Iot_Equipment")
            .doc("2"), // Reference to Iot_Equipment document
          FactorRef: db
            .collection("Iot")
            .doc("documentID2")
            .collection("Factor")
            .doc("2"), // Reference to Factor document
        },
      });
  } catch (error) {
    console.error("Error creating document: ", error);
  }
}

// เรียกใช้ฟังก์ชันสร้างข้อมูล
createData();
