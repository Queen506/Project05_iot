const admin = require("firebase-admin");
const serviceAccount = require("./project05-3fa8e-firebase-adminsdk-gt1fq-16319e261a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

async function createData() {
  try {
    await db.collection("GPS").doc("1").set({});
    await db.collection("GPS").doc("2").set({});
    await db.collection("Lat").doc("1").set({});
    await db.collection("Lat").doc("2").set({});
    await db.collection("Long").doc("1").set({});
    await db.collection("Long").doc("2").set({});
    // สร้าง document ใน collection 'Factor'
    await db.collection("Factor").doc("1").set({
      FactorID: "1",
      FactorName: "Temp",
    });
    await db.collection("Factor").doc("2").set({
      FactorID: 2,
      FactorName: "Smoke",
    });
    console.log("Factor document created successfully");

    // สร้าง document ใน collection 'Iot_Type'
    await db.collection("Iot_Type").doc("1").set({
      Iot_TypeID: 1,
      Iot_TypeName: "Type1",
    });
    await db.collection("Iot_Type").doc("2").set({
      Iot_TypeID: 2,
      Iot_TypeName: "Type2",
    });
    console.log("Iot_Type document created successfully");

    // สร้าง document ใน collection 'Iot_Equipment' โดยมีการอ้างอิงไปยัง 'Iot_Type/1'
    await db
      .collection("Iot_Equipment")
      .doc("1")
      .set({
        Iot_EquipmentID: 1,
        Iot_EquipmentName: "equipment1",
        Iot_TypeRef: db.collection("Iot_Type").doc("1"), // ใช้ reference ไปยัง Iot_Type/1
      });
    await db
      .collection("Iot_Equipment")
      .doc("2")
      .set({
        Iot_EquipmentName: "equipment2",
        Iot_TypeRef: db.collection("Iot_Type").doc("2"), // ใช้ reference ไปยัง Iot_Type/1
      });
    console.log("Iot_Equipment document created successfully");

    // สร้าง document ใน collection 'Iot_Detail' โดยมีการอ้างอิงไปยัง 'Iot_Equipment_m/documentId1' และ 'Factor_m/documentId1'
    await db
      .collection("Iot_Detail")
      .doc("1")
      .set({
        ts: [admin.firestore.Timestamp.now()], // ใช้ Timestamp ปัจจุบัน, แทนที่ด้วย timestamp ที่ต้องการหากมี
        minValue: 10,
        avgValue: 15,
        maxValue: 20,
        Iot_Equipment: db.collection("Iot_Equipment").doc("1"), // ใช้ reference ไปยัง Iot_Equipment_m/documentId1
        FactorRef: db.collection("Factor").doc("1"), // ใช้ reference ไปยัง Factor_m/documentId1
      });
    await db
      .collection("Iot_Detail")
      .doc("2")
      .set({
        ts: [admin.firestore.Timestamp.now()], // ใช้ Timestamp ปัจจุบัน, แทนที่ด้วย timestamp ที่ต้องการหากมี
        minValue: 15,
        avgValue: 30,
        maxValue: 50,
        Iot_Equipment: db.collection("Iot_Equipment").doc("2"), // ใช้ reference ไปยัง Iot_Equipment_m/documentId1
        FactorRef: db.collection("Factor").doc("2"), // ใช้ reference ไปยัง Factor_m/documentId1
      });
    console.log("Iot_Detail document created successfully");
  } catch (error) {
    console.error("Error creating document: ", error);
  }
}

createData();
