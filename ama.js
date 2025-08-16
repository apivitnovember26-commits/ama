document.addEventListener('DOMContentLoaded', () => {

    // ดึง Element ต่างๆ มาใช้งาน (เพิ่มของใหม่เข้ามา)
    const phoneInput = document.getElementById('phone-input');
    const checkButton = document.getElementById('check-button');
    const resultDisplay = document.getElementById('result-display');
    const scamDetailsBox = document.getElementById('scam-details-box');
    const blockButton = document.getElementById('block-button');

    // ===== 1. ปรับโครงสร้างฐานข้อมูล =====
    // เปลี่ยนจาก Array ของ String เป็น Array ของ Object
   const scamDatabase = [
    {
        phone: '0954965039',
        channels: 'เบอร์โทรศัพท์',
        banks: 'UOB 3193275093',
        history: 'อ้างเป็นเจ้าหน้าที่ธนาคาร'
    },
    {
        phone: '0902759909',
        channels: 'เพจfacebook',
        banks: 'ไทยพาณิชิย 5572728312',
        history: 'ทักรับปรุงเครดิตแล้วนายกรง'
    },
    {
        phone: '090955399',
        channels: 'X:@fahhehehee',
        banks: 'PromptPay 090955399',
        history: 'พอติดต่อซื้อและโอนเงินเหมือนจะส่งของให้แต่ไม่ส่ง'
    },
    {
        phone: '0618809269',
        channels: 'FB,AI NG',
        banks: 'ออมสิน 020421655281',
        history: 'หลอกขาย iphone 13'
    },
    {
        phone: '0929633408',
        channels: 'X @hjkhkbhe',
        banks: 'True Wallet 0929633408',
        history: 'โกงค่าธรรมเนียม ชื่อ Ink Waruntorn'
    },
    {
        phone: '0636227002',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างว่าเป็นพนักงาน J&T express'
    },
    {
        phone: '0853628344',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างว่าเป็นพนักงาน J&T express'
    },
    {
        phone: '0853631786',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างว่าเป็นพนักงาน J&T express'
    },
    {
        phone: '0954965042',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'คอลเซ็นเตอร์'
    },
    {
        phone: '0827813489',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างว่าเป็นเจ้าหน้าที่ธนาคาร'
    },
    {
        phone: '0990352426',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างว่าเป็นเจ้าหน้าที่ธนาคาร'
    },
    {
        phone: '0979280979',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'คอลเซ็นเตอร์'
    },
    {
        phone: '0979289817',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'คอลเซ็นเตอร์'
    },
    {
        phone: '0989941016',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างเป็นเจ้าหน้าที่ประกันภัย'
    },
    {
        phone: '021159420',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างเป็นเจ้าหน้าที่ประกันภัย'
    },
    {
        phone: '0949422420',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างเป็นเจ้าหน้าที่รัฐ'
    },
    {
        phone: '0947718430',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างเป็นเจ้าหน้าที่รัฐ'
    },
    {
        phone: '0950759005',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'อ้างเป็นเจ้าหน้าที่รัฐ'
    },
    {
        phone: '0954965052',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'คอลเซ็นเตอร์'
    },
    {
        phone: '0954965053',
        channels: 'เบอร์โทรศัพท์',
        banks: '',
        history: 'คอลเซ็นเตอร์'
    }
];

    let currentScamNumber = null; // ตัวแปรสำหรับเก็บเบอร์ที่กำลังแสดงผล

    // ===== 2. แก้ไขฟังก์ชันตรวจสอบเบอร์ =====
    const checkPhoneNumber = () => {
        const phoneNumber = phoneInput.value.trim();

        // ซ่อนกล่องรายละเอียดทุกครั้งที่เริ่มการตรวจสอบใหม่
        scamDetailsBox.classList.remove('visible');
        currentScamNumber = null;

        if (phoneNumber === '') {
            displayResult('กรุณากรอกเบอร์โทรศัพท์', 'error');
            return;
        }

        // ใช้ .find() เพื่อค้นหา Object ที่มีเบอร์ตรงกัน
        const foundEntry = scamDatabase.find(entry => entry.phone === phoneNumber);

        displayResult('กำลังตรวจสอบข้อมูล...', 'loading');

        setTimeout(() => {
            if (foundEntry) {
                // ถ้าเจอเบอร์
                displayResult(`🚨 เบอร์ ${phoneNumber} มีความเสี่ยงเป็นมิจฉาชีพ!`, 'scam');
                // แสดงรายละเอียดเพิ่มเติม
                displayScamDetails(foundEntry);
                currentScamNumber = foundEntry.phone;
            } else {
                // ถ้าไม่เจอ
                displayResult(`✅ ไม่พบเบอร์ ${phoneNumber} ในฐานข้อมูลมิจฉาชีพ`, 'safe');
            }
        }, 1000);
    };

    // ===== 3. สร้างฟังก์ชันใหม่สำหรับแสดงรายละเอียด =====
    function displayScamDetails(entry) {
        // นำข้อมูลจาก Object ไปใส่ใน HTML
        document.getElementById('details-channels').innerText = entry.channels;
        document.getElementById('details-banks').innerText = entry.banks;
        document.getElementById('details-history').innerText = entry.history;
        
        // ทำให้กล่องรายละเอียดแสดงผลขึ้นมา
        scamDetailsBox.classList.add('visible');
    }

    // ฟังก์ชันสำหรับแสดงผลลัพธ์หลัก (เหมือนเดิม)
    const displayResult = (message, type) => {
        resultDisplay.innerHTML = message;
        resultDisplay.className = '';
        if (type === 'safe') resultDisplay.classList.add('result-safe');
        else if (type === 'scam') resultDisplay.classList.add('result-scam');
        else if (type === 'error') resultDisplay.classList.add('result-error');
    };

    // ===== 4. เพิ่มการทำงานให้ปุ่มบล็อก =====
    blockButton.addEventListener('click', () => {
        if (currentScamNumber) {
            // ดึงรายการที่เคยบล็อกไว้จาก localStorage (ถ้ามี)
            let blockedList = JSON.parse(localStorage.getItem('myBlacklist')) || [];
            
            // เช็คว่าเคยบล็อกเบอร์นี้ไปแล้วหรือยัง
            if (!blockedList.includes(currentScamNumber)) {
                blockedList.push(currentScamNumber);
                // บันทึกรายการใหม่กลับไปที่ localStorage
                localStorage.setItem('myBlacklist', JSON.stringify(blockedList));
                alert(`เพิ่มเบอร์ ${currentScamNumber} เข้าสู่ Blacklist ส่วนตัวของคุณแล้ว`);
            } else {
                alert(`เบอร์ ${currentScamNumber} อยู่ใน Blacklist ของคุณอยู่แล้ว`);
            }
            console.log('My Blacklist:', blockedList);
        }
    });

    // Event Listeners (เหมือนเดิม)
    checkButton.addEventListener('click', checkPhoneNumber);
    phoneInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') checkPhoneNumber();
    });
}); 