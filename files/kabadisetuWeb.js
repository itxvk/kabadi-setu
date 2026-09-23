/* ================= STORAGE (safe wrapper: localStorage with in-memory fallback) ================= */
const Store = {
    mem: {},
    get(key, fallback) {
        try {
            const v = localStorage.getItem(key);
            return v !== null ? JSON.parse(v) : fallback;
        } catch (e) { return (key in this.mem) ? this.mem[key] : fallback; }
    },
    set(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); }
        catch (e) { this.mem[key] = value; }
    }
};

/* ================= THEME (dark mode) ================= */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    Store.set('kc_theme', next);
}
(function initTheme() {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(Store.get('kc_theme', prefersDark ? 'dark' : 'light'));
})();

/* ================= I18N ================= */
const STR = {
    en: {
        homeTitle: "Price Board", homeSubtitle: "Today's fair buying rates from authorized recyclers",
        priceDisclaimer: "Demo rates shown for prototype. Live version pulls current rates from the recycler network dataset. \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future.",
        navHome: "Home", navLots: "My Lots", navNew: "New Lot", navLedger: "Ledger", navMore: "More",
        newLotTitle: "Create New Lot", stepCategory: "What did you collect?", stepPhoto: "Add a photo",
        photoHint: "A clear photo builds trust with the recycler", choosePhoto: "Take / Choose Photo",
        back: "Back", next: "Next", stepWeight: "How much does it weigh?", estValueLabel: "Estimated value",
        stepConfirm: "Confirm your lot", saveLot: "Save Lot",
        gettingLocation: "📍 Getting location…", locationApprox: "📍 Approx. location used (GPS unavailable)", locationCaptured: "📍 Location captured",
        toastLotSaved: "Lot saved! Ready to find a recycler.",
        myLotsTitle: "My Lots", myLotsSub: "Track every lot from collection to payment",
        noLotsYet: "No lots yet. Tap + to create your first lot.",
        statusDraft: "Draft", statusQuoted: "Quoted", statusMatched: "Matched", statusHanded: "Handed Over", statusCompleted: "Completed",
        findRecyclers: "Find Recyclers", viewRecord: "View Handover Record",
        recyclerMatchTitle: "Recyclers for this lot", authorizedBadge: "✓ Authorized", notAuthorizedBadge: "Not Authorized",
        notRecommendedHead: "⚠ Not Recommended", notRecommendedNote: "Not authorized under E-Waste Rules 2022. Materials may not be safely processed.",
        distanceAway: "km away", offeredValueLabel: "Offered value", pickupYes: "Pickup available", pickupNo: "Drop-off only",
        selectHandover: "Select & Handover", noRecyclers: "No recyclers currently accept this material nearby.",
        handoverTitle: "Handover Confirmed", refLabel: "Reference ID", timeLabel: "Time", gpsLabel: "Location",
        recyclerLabel: "Recycler", valueLabel: "Value", shareWhatsapp: "Share via WhatsApp", markCashReceived: "Mark Cash Received",
        paymentPending: "Payment Pending", paymentPaid: "Paid", done: "Done",
        ledgerTitle: "Earnings Ledger", totalEarnings: "Total Earned", pendingDues: "Pending Dues",
        pendingPayments: "Pending Payments", transactionHistory: "Transaction History", noTransactions: "No transactions yet.",
        moreTitle: "More", languageLabel: "Choose your language",
        syncTitle: "Offline Sync", syncNow: "Sync Now",
        safetyTitle: "Safety Guidance", listen: "Listen",
        aboutTitle: "About KabadiSetu",
        aboutBody: "<b>KabadiSetu</b><br> A smart digital platform for efficient scrap collection and responsible recycling that connects waste collectors(kabadiwalas) with authorized recyclers, making scrap trading more transparent, efficient and accessible. By enabling fair pricing, verified transactions, and streamlined communication, KabadiSetu helps strengthen the recycling ecosystem while promoting sustainable waste management and a cleaner environment!",
        toastSynced: "All lots synced.", toastNoOffline: "You're offline — will sync when connected.",
        weightLabel: "Weight",
        cat_crt: "CRT Monitor/TV", cat_lcd: "LCD Panel", cat_pcb: "Circuit Board (PCB)", cat_cable: "Cables",
        cat_battery: "Batteries", cat_motor: "Motor / Magnet", cat_plastic: "Mixed Plastic",
        safety1t: "Batteries", safety1d: "Don't puncture or crush batteries. Keep away from heat and store separately.",
        safety2t: "CRT Monitors/TVs", safety2d: "Contains glass and lead. Wear gloves, don't break the tube.",
        safety3t: "No Open Burning", safety3d: "Burning cables releases toxic fumes. Sell insulated cables as-is.",
        safety4t: "No Acid Treatment", safety4d: "Acid leaching harms skin and lungs. Hand over PCBs whole to authorized recyclers.",
        roleKabadiwala: "Kabadiwala", roleRecycler: "Recycler", loginTitle: "Log in to KabadiSetu", loginSub: "Collect, sell and track your scrap",
        mobileLabel: "Mobile number", sendOtp: "Send OTP", changeNumber: "Change number", verifyOtp: "Verify & Continue", resendOtp: "Resend OTP", otpResent: "OTP resent",
        otpSent: "OTP sent to +91 ", nameTitle: "What should we call you?", nameSub: "This name will greet you on your home screen",
        nameLabel: "Your name", namePlaceholder: "e.g. Raju Kumar", continueBtn: "Continue",
        welcomeBack: "Welcome back", whatToDo: "What do you want to do today?",
        invalidPhone: "Enter a valid 10-digit number", wrongOtp: "Enter all 4 digits"
    },
    hi: {
        homeTitle: "भाव बोर्ड", homeSubtitle: "आज के सही दाम, अधिकृत रिसाइक्लर से",
        priceDisclaimer: "यह प्रोटोटाइप के लिए नमूना दाम हैं। पूरे संस्करण में असली दाम रिसाइक्लर नेटवर्क से आएंगे। \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future.",
        navHome: "होम", navLots: "मेरे लॉट", navNew: "नया लॉट", navLedger: "कमाई", navMore: "और",
        newLotTitle: "नया लॉट बनाएं", stepCategory: "आपने क्या इकट्ठा किया?", stepPhoto: "फोटो जोड़ें",
        photoHint: "साफ फोटो से रिसाइक्लर का भरोसा बढ़ता है", choosePhoto: "फोटो लें / चुनें",
        back: "पीछे", next: "आगे", stepWeight: "वज़न कितना है?", estValueLabel: "अनुमानित कीमत",
        stepConfirm: "लॉट की पुष्टि करें", saveLot: "लॉट सेव करें",
        gettingLocation: "📍 लोकेशन ली जा रही है…", locationApprox: "📍 अनुमानित लोकेशन (GPS उपलब्ध नहीं)", locationCaptured: "📍 लोकेशन दर्ज हुई",
        toastLotSaved: "लॉट सेव हो गया! अब रिसाइक्लर ढूंढें।",
        myLotsTitle: "मेरे लॉट", myLotsSub: "हर लॉट को कलेक्शन से पेमेंट तक ट्रैक करें",
        noLotsYet: "अभी कोई लॉट नहीं। + दबाकर पहला लॉट बनाएं।",
        statusDraft: "ड्राफ्ट", statusQuoted: "कोटेड", statusMatched: "मैच हुआ", statusHanded: "सौंपा गया", statusCompleted: "पूरा हुआ",
        findRecyclers: "रिसाइक्लर ढूंढें", viewRecord: "हैंडओवर रिकॉर्ड देखें",
        recyclerMatchTitle: "इस लॉट के लिए रिसाइक्लर", authorizedBadge: "✓ अधिकृत", notAuthorizedBadge: "अनधिकृत",
        notRecommendedHead: "⚠ सुझाया नहीं गया", notRecommendedNote: "E-Waste नियम 2022 के तहत अधिकृत नहीं है। सामान सुरक्षित तरीके से प्रोसेस नहीं हो सकता।",
        distanceAway: "किमी दूर", offeredValueLabel: "दी गई कीमत", pickupYes: "पिकअप उपलब्ध", pickupNo: "सिर्फ ड्रॉप-ऑफ",
        selectHandover: "चुनें और सौंपें", noRecyclers: "पास में इस सामान के लिए कोई रिसाइक्लर नहीं है।",
        handoverTitle: "हैंडओवर पक्का हुआ", refLabel: "रेफरेंस आईडी", timeLabel: "समय", gpsLabel: "लोकेशन",
        recyclerLabel: "रिसाइक्लर", valueLabel: "कीमत", shareWhatsapp: "व्हाट्सएप पर भेजें", markCashReceived: "कैश मिला — चिन्हित करें",
        paymentPending: "पेमेंट बाकी", paymentPaid: "पेमेंट हो गई", done: "हो गया",
        ledgerTitle: "कमाई का हिसाब", totalEarnings: "कुल कमाई", pendingDues: "बाकी पैसा",
        pendingPayments: "बाकी पेमेंट", transactionHistory: "लेन-देन इतिहास", noTransactions: "अभी कोई लेन-देन नहीं।",
        moreTitle: "और", languageLabel: "अपनी भाषा चुनें",
        syncTitle: "ऑफलाइन सिंक", syncNow: "अभी सिंक करें",
        safetyTitle: "सुरक्षा सलाह", listen: "सुनें",
        aboutTitle: "इस प्रोटोटाइप के बारे में",
        aboutBody: "<b>KabadiSetu</b> यह स्क्रैप इकट्ठा करने और ज़िम्मेदारी से रीसाइक्लिंग करने के लिए एक स्मार्ट डिजिटल प्लेटफ़ॉर्म है। यह कचरा इकट्ठा करने वालों (कबाड़ीवालों) को अधिकृत रीसाइक्लर से जोड़ता है, जिससे स्क्रैप का व्यापार ज़्यादा पारदर्शी, कुशल और आसान हो जाता है। सही कीमत, वेरिफ़ाइड ट्रांज़ैक्शन और बेहतर बातचीत की सुविधा देकर, KabadiSetu रीसाइक्लिंग इकोसिस्टम को मज़बूत बनाने के साथ-साथ सस्टेनेबल वेस्ट मैनेजमेंट और साफ़-सुथरे पर्यावरण को बढ़ावा देता है!",
        toastSynced: "सभी लॉट सिंक हो गए।", toastNoOffline: "आप ऑफलाइन हैं — कनेक्ट होते ही सिंक होगा।",
        weightLabel: "वज़न",
        cat_crt: "पुराना टीवी/मॉनिटर", cat_lcd: "LCD पैनल", cat_pcb: "सर्किट बोर्ड", cat_cable: "तार-केबल",
        cat_battery: "बैटरी", cat_motor: "मोटर/मैग्नेट", cat_plastic: "मिला-जुला प्लास्टिक",
        safety1t: "बैटरी", safety1d: "बैटरी को तोड़ें या दबाएं नहीं। गर्मी से दूर, अलग रखें।",
        safety2t: "पुराना टीवी/मॉनिटर (CRT)", safety2d: "इसमें शीशा और लेड होता है। दस्ताने पहनें, ट्यूब न तोड़ें।",
        safety3t: "जलाएं नहीं", safety3d: "तार जलाने से ज़हरीला धुआं निकलता है। तार को वैसे ही बेचें।",
        safety4t: "एसिड का इस्तेमाल न करें", safety4d: "एसिड से त्वचा और फेफड़ों को नुकसान होता है। बोर्ड पूरा ही सौंपें।",
        roleKabadiwala: "कबाड़ीवाला", roleRecycler: "रीसाइक्लर", loginTitle: "कबाड़ीसेतु में लॉगिन करें", loginSub: "कबाड़ इकट्ठा करें, बेचें और ट्रैक करें",
        mobileLabel: "मोबाइल नंबर", sendOtp: "OTP भेजें", changeNumber: "नंबर बदलें", verifyOtp: "सत्यापित करें और जारी रखें", resendOtp: "OTP फिर भेजें", otpResent: "OTP फिर भेजा गया",
        otpSent: "OTP भेजा गया +91 ", nameTitle: "आपको क्या कहकर बुलाएं?", nameSub: "यह नाम आपके होम स्क्रीन पर दिखेगा",
        nameLabel: "आपका नाम", namePlaceholder: "जैसे राजू कुमार", continueBtn: "जारी रखें",
        welcomeBack: "वापसी पर स्वागत है", whatToDo: "आज आप क्या करना चाहते हैं?",
        invalidPhone: "सही 10 अंकों का नंबर डालें", wrongOtp: "सभी 4 अंक भरें"
    },
    mr: {
        homeTitle: "भाव फलक", homeSubtitle: "आजचे योग्य भाव, अधिकृत रिसायकलरकडून",
        priceDisclaimer: "हे प्रोटोटाइपसाठी नमुना दर आहेत. पूर्ण आवृत्तीत खरे दर रिसायकलर नेटवर्कमधून येतील. \u00A9 2026 KabadiSetu. Bridging Waste Collectors and Recyclers for a Sustsainable Future",
        navHome: "होम", navLots: "माझे लॉट", navNew: "नवीन लॉट", navLedger: "कमाई", navMore: "अधिक",
        newLotTitle: "नवीन लॉट तयार करा", stepCategory: "तुम्ही काय गोळा केले?", stepPhoto: "फोटो जोडा",
        photoHint: "स्पष्ट फोटोमुळे रिसायकलरचा विश्वास वाढतो", choosePhoto: "फोटो काढा / निवडा",
        back: "मागे", next: "पुढे", stepWeight: "वजन किती आहे?", estValueLabel: "अंदाजे किंमत",
        stepConfirm: "लॉटची खात्री करा", saveLot: "लॉट सेव्ह करा",
        gettingLocation: "📍 लोकेशन घेतले जात आहे…", locationApprox: "📍 अंदाजे लोकेशन (GPS उपलब्ध नाही)", locationCaptured: "📍 लोकेशन नोंदवले",
        toastLotSaved: "लॉट सेव्ह झाला! आता रिसायकलर शोधा.",
        myLotsTitle: "माझे लॉट", myLotsSub: "प्रत्येक लॉट संकलनापासून पेमेंटपर्यंत ट्रॅक करा",
        noLotsYet: "अजून लॉट नाही. + दाबून पहिला लॉट तयार करा.",
        statusDraft: "ड्राफ्ट", statusQuoted: "कोट झाले", statusMatched: "जुळले", statusHanded: "हस्तांतरित", statusCompleted: "पूर्ण",
        findRecyclers: "रिसायकलर शोधा", viewRecord: "हस्तांतरण रेकॉर्ड पहा",
        recyclerMatchTitle: "या लॉटसाठी रिसायकलर", authorizedBadge: "✓ अधिकृत", notAuthorizedBadge: "अनधिकृत",
        notRecommendedHead: "⚠ शिफारस नाही", notRecommendedNote: "E-Waste नियम 2022 अंतर्गत अधिकृत नाही. साहित्य सुरक्षितपणे प्रक्रिया होणार नाही.",
        distanceAway: "किमी अंतरावर", offeredValueLabel: "दिलेली किंमत", pickupYes: "पिकअप उपलब्ध", pickupNo: "फक्त ड्रॉप-ऑफ",
        selectHandover: "निवडा आणि हस्तांतर करा", noRecyclers: "जवळपास या साहित्यासाठी रिसायकलर नाही.",
        handoverTitle: "हस्तांतरण पक्के झाले", refLabel: "संदर्भ आयडी", timeLabel: "वेळ", gpsLabel: "लोकेशन",
        recyclerLabel: "रिसायकलर", valueLabel: "किंमत", shareWhatsapp: "व्हॉट्सअ‍ॅपवर पाठवा", markCashReceived: "रोख मिळाली — नोंद करा",
        paymentPending: "पेमेंट बाकी", paymentPaid: "पेमेंट झाले", done: "झाले",
        ledgerTitle: "कमाईचा हिशोब", totalEarnings: "एकूण कमाई", pendingDues: "बाकी रक्कम",
        pendingPayments: "बाकी पेमेंट", transactionHistory: "व्यवहार इतिहास", noTransactions: "अजून व्यवहार नाही.",
        moreTitle: "अधिक", languageLabel: "तुमची भाषा निवडा",
        syncTitle: "ऑफलाइन सिंक", syncNow: "आता सिंक करा",
        safetyTitle: "सुरक्षा मार्गदर्शन", listen: "ऐका",
        aboutTitle: "या प्रोटोटाइपबद्दल",
        aboutBody: "<b>KabadiSetu</b> कार्यक्षम भंगार संकलन आणि जबाबदार पुनर्वापरासाठी एक स्मार्ट डिजिटल प्लॅटफॉर्म, जो कचरा गोळा करणाऱ्यांना (कबाडीवाल्यांना) अधिकृत पुनर्वापर करणाऱ्यांशी जोडतो, ज्यामुळे भंगार व्यापार अधिक पारदर्शक, कार्यक्षम आणि सुलभ होतो. योग्य दर, सत्यापित व्यवहार आणि सुव्यवस्थित संवाद सक्षम करून, कबाडीसेतू पुनर्वापर परिसंस्थेला बळकट करण्यास मदत करते, तसेच शाश्वत कचरा व्यवस्थापन आणि स्वच्छ पर्यावरणाला प्रोत्साहन देते!",
        toastSynced: "सर्व लॉट सिंक झाले.", toastNoOffline: "तुम्ही ऑफलाइन आहात — कनेक्ट झाल्यावर सिंक होईल.",
        weightLabel: "वजन",
        cat_crt: "जुना टीव्ही/मॉनिटर", cat_lcd: "LCD पॅनल", cat_pcb: "सर्किट बोर्ड", cat_cable: "तार-केबल",
        cat_battery: "बॅटरी", cat_motor: "मोटर/मॅग्नेट", cat_plastic: "मिश्र प्लास्टिक",
        safety1t: "बॅटरी", safety1d: "बॅटरी फोडू नका किंवा दाबू नका. उष्णतेपासून दूर, वेगळी ठेवा.",
        safety2t: "जुना टीव्ही/मॉनिटर (CRT)", safety2d: "यात काच आणि शिसे असते. हातमोजे घाला, ट्यूब फोडू नका.",
        safety3t: "जाळू नका", safety3d: "तार जाळल्याने विषारी धूर निघतो. तार जशी आहे तशी विका.",
        safety4t: "आम्ल वापरू नका", safety4d: "आम्लामुळे त्वचा आणि फुफ्फुसांना हानी होते. बोर्ड जसाच्या तसा द्या.",
        roleKabadiwala: "कबाडीवाला", roleRecycler: "रिसायकलर", loginTitle: "कबाडीसेतू मध्ये लॉगिन करा", loginSub: "भंगार गोळा करा, विका आणि ट्रॅक करा",
        mobileLabel: "मोबाईल नंबर", sendOtp: "OTP पाठवा", changeNumber: "नंबर बदला", verifyOtp: "पडताळणी करा आणि पुढे जा", resendOtp: "OTP पुन्हा पाठवा", otpResent: "OTP पुन्हा पाठवला",
        otpSent: "OTP पाठवला +91 ", nameTitle: "तुम्हाला काय म्हणून हाक मारू?", nameSub: "हे नाव तुमच्या होम स्क्रीनवर दिसेल",
        nameLabel: "तुमचे नाव", namePlaceholder: "उदा. राजू कुमार", continueBtn: "पुढे जा",
        welcomeBack: "पुन्हा स्वागत आहे", whatToDo: "आज तुम्हाला काय करायचे आहे?",
        invalidPhone: "वैध 10-अंकी नंबर टाका", wrongOtp: "सर्व 4 अंक भरा"
    }
};
let LANG = Store.get('kc_lang', null);
function t(key) { const d = STR[LANG || 'en']; return (d && d[key] !== undefined) ? d[key] : (STR.en[key] || key); }

/* ================= DATA ================= */
const CATS = [
    { key: 'crt', em: '📺' }, { key: 'lcd', em: '🖥️' }, { key: 'pcb', em: '🔧' }, { key: 'cable', em: '🔌' },
    { key: 'battery', em: '🔋' }, { key: 'motor', em: '⚙️' }, { key: 'plastic', em: '♻️' }
];
const PRICES = {
    crt: { rate: 8, hist: [7, 7.5, 7.5, 8, 8, 7.5, 8] },
    lcd: { rate: 15, hist: [14, 14, 15, 15, 14.5, 15, 15] },
    pcb: { rate: 180, hist: [165, 170, 168, 175, 178, 182, 180] },
    cable: { rate: 35, hist: [32, 33, 34, 33, 35, 36, 35] },
    battery: { rate: 25, hist: [22, 23, 24, 24, 25, 25, 25] },
    motor: { rate: 45, hist: [40, 41, 43, 44, 45, 46, 45] },
    plastic: { rate: 12, hist: [11, 11.5, 12, 12, 11.5, 12, 12] }
};
const RECYCLERS = [
    { id: 'r6', name: 'Bharat Recyclers', lat: 26.2442, lng: 80.1164, authorized: true, materials: 'all', mult: 1.05, pickup: true },
    { id: 'r1', name: 'GreenLoop E-Waste Recyclers', lat: 26.4780, lng: 80.3462, authorized: false, materials: 'all', mult: 1.05, pickup: true },
    { id: 'r2', name: 'Bhoomi Metal Recovery', lat: 26.5123, lng: 80.2890, authorized: true, materials: ['pcb', 'motor', 'cable'], mult: 1.10, pickup: false },
    { id: 'r3', name: 'Suraksha Recyclers Pvt Ltd', lat: 26.5464, lng: 80.4879, authorized: true, materials: ['crt', 'lcd', 'plastic'], mult: 0.98, pickup: true },
    { id: 'r4', name: 'Nav Disha Aggregators', lat: 26.4200, lng: 80.3600, authorized: false, materials: 'all', mult: 1.20, pickup: true },
    { id: 'r5', name: 'EcoCircle Processing Unit', lat: 26.8467, lng: 80.9462, authorized: true, materials: ['battery', 'motor', 'pcb'], mult: 1.15, pickup: false }

];
const DEFAULT_LOC = { lat: 26.4499, lng: 80.3319 }; // Kanpur fallback

/* ================= STATE ================= */
let lots = Store.get('kc_lots', []);
let draft = {};
function saveLots() { Store.set('kc_lots', lots); }

/* ================= AUTH STATE ================= */
let ROLE = Store.get('kc_role', 'kw');
let USERNAME = Store.get('kc_name', null);
function showAuth(id) {
    ['onboarding', 'authLogin', 'authOtp', 'authName'].forEach(s => document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    //auto-set cursor
    setTimeout(() => {
        const first = document.querySelector('#' + id + ' input');
        if (first) first.focus();
    }, 30);
}
function setRole(r) {
    ROLE = r; Store.set('kc_role', r);
    document.getElementById('roleKW').classList.toggle('active', r === 'kw');
    document.getElementById('roleRC').classList.toggle('active', r === 'rc');
    document.getElementById('loginEmoji').textContent = r === 'kw' ? '🧺' : '🏭';
}
function checkPhone() {
    const v = document.getElementById('phoneInput').value.replace(/\D/g, '');
    document.getElementById('phoneInput').value = v;
    document.getElementById('sendOtpBtn').disabled = v.length !== 10;
}
function sendOtp() {
    const v = document.getElementById('phoneInput').value;
    if (v.length !== 10) { showToast(t('invalidPhone')); return; }
    showAuth('authOtp');
    document.getElementById('otpSentLabel').textContent = t('otpSent') + v;
    document.querySelectorAll('#authOtp .otp-row input').forEach(i => i.value = '');
    showToast('OTP: 1234');
}
function otpMove(el) {
    el.value = el.value.replace(/\D/g, '').slice(0, 1);
    if (el.value && el.nextElementSibling) el.nextElementSibling.focus();
}

function otpKeydown(el, e) {
    if (e.key === 'Backspace' && !el.value && el.previousElementSibling) {
        el.previousElementSibling.focus();
    } else if (e.key === 'Enter') {
        verifyOtpNow();
    }
}
function verifyOtpNow() {
    let val = ''; document.querySelectorAll('#authOtp .otp-row input').forEach(i => val += i.value);
    if (val.length !== 4) { showToast(t('wrongOtp')); return; }
    if (USERNAME) { finishAuth(); } else { showAuth('authName'); }
}
function signOut() {
    try { localStorage.removeItem('kc_role'); localStorage.removeItem('kc_name'); } catch (e) { }
    window.location.href = 'kabadisetuWeb.html';
}
function checkName() {
    document.getElementById('nameContinueBtn').disabled = document.getElementById('nameInput').value.trim().length < 2;
}
function saveName() {
    const name = document.getElementById('nameInput').value.trim();
    if (name.length < 2) return;
    USERNAME = name; Store.set('kc_name', name);
    finishAuth();
}
function finishAuth() {
    // Recyclers get their own dashboard — send them there instead of the kabadiwala home screen.
    if (ROLE === 'rc') {
        Store.set('kc_name', USERNAME || '');
        window.location.href = 'kabadisetu-recycler.html';
        return;
    }
    document.getElementById('userNameDisplay').textContent = USERNAME || 'Raju';
    document.getElementById('avatarInit').textContent = (USERNAME || 'R').charAt(0).toUpperCase();
    showAuth('onboarding');
    document.getElementById('onboarding').classList.add('hidden');
    applyLang();
    renderAll();
}
/* ================= INIT / LANG ================= */
function setLang(l) {
    LANG = l; Store.set('kc_lang', l);
    applyLang();
    showAuth('authLogin');
}
function applyLang() {
    document.documentElement.lang = LANG || 'en';
    document.querySelectorAll('[data-t]').forEach(el => {
        const k = el.getAttribute('data-t');
        el.innerHTML = t(k);
    });
    document.querySelectorAll('[data-tph]').forEach(el => {
        const k = el.getAttribute('data-tph');
        el.placeholder = t(k);
    });
    ['hi', 'mr', 'en'].forEach(l => {
        const chip = document.getElementById('chip-' + l);
        if (chip) chip.classList.toggle('active', LANG === l);
    });
    document.getElementById('aboutBody').innerHTML = t('aboutBody');
}

/* ================= NAV ================= */
function showView(name) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-' + name).classList.add('active');
    document.querySelectorAll('.navbtn').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    if (name === 'home') renderPriceBoard();
    if (name === 'mylots') renderLotsList();
    if (name === 'ledger') renderLedger();
    if (name === 'more') renderMore();
    if (name === 'newlot') { resetLotFlow(); }
    window.scrollTo(0, 0);
}

/* ================= PRICE BOARD ================= */
function sparkline(hist) {
    const w = 52, h = 22, max = Math.max(...hist), min = Math.min(...hist), range = (max - min) || 1;
    const pts = hist.map((v, i) => {
        const x = (i / (hist.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return x.toFixed(1) + ',' + y.toFixed(1);
    }).join(' ');
    const up = hist[hist.length - 1] >= hist[0];
    return `<svg class="spark" viewBox="0 0 ${w} ${h}"><polyline points="${pts}" fill="none" stroke="${up ? '#2F6B52' : '#B8502F'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
}
function speak(text) {
    try {
        if (!('speechSynthesis' in window)) return;
        const u = new SpeechSynthesisUtterance(text);
        u.lang = LANG === 'hi' ? 'hi-IN' : LANG === 'mr' ? 'mr-IN' : 'en-IN';
        speechSynthesis.cancel();
        speechSynthesis.speak(u);
    } catch (e) { }
}
function renderPriceBoard() {
    const box = document.getElementById('priceBoard');
    box.innerHTML = CATS.map(c => {
        const p = PRICES[c.key];
        const up = p.hist[p.hist.length - 1] >= p.hist[0];
        return `<div class="price-row">
      <div class="price-emoji">${c.em}</div>
      <div class="price-info">
        <div class="price-name">${t('cat_' + c.key)}</div>
        <div class="price-rate">₹${p.rate}/kg <span class="trend ${up ? 'up' : 'down'}">${up ? '▲' : '▼'}</span></div>
      </div>
      ${sparkline(p.hist)}
      <button class="listenbtn" onclick="speak('${t('cat_' + c.key).replace(/'/g, "\\'")} ${p.rate} ${LANG === 'en' ? 'rupees per kilo' : 'रुपये किलो'}')"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg></button>
    </div>`;
    }).join('');
}

/* ================= NEW LOT FLOW ================= */
function resetLotFlow() {
    draft = { category: null, weight: 2.0, photo: null, id: null };
    document.getElementById('catGrid').innerHTML = CATS.map(c =>
        `<div class="cattile" id="tile-${c.key}" onclick="pickCategory('${c.key}')">
      <span class="em">${c.em}</span><span class="lb">${t('cat_' + c.key)}</span>
    </div>`).join('');
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('photoPlaceholder').style.display = 'block';
    document.getElementById('weightNum').textContent = draft.weight.toFixed(1);
    lotStep(1);
}
function pickCategory(key) {
    draft.category = key;
    document.querySelectorAll('.cattile').forEach(el => el.classList.remove('sel'));
    document.getElementById('tile-' + key).classList.add('sel');
    setTimeout(() => lotStep(2), 180);
}
function lotStep(n) {
    for (let i = 1; i <= 4; i++) document.getElementById('lotstep-' + i).style.display = (i === n) ? 'block' : 'none';
    for (let i = 1; i <= 4; i++) document.getElementById('st' + i).classList.toggle('done', i <= n);
    if (n === 3) updateWeightUI();
    if (n === 4) buildConfirm();
}
document.getElementById('photoInput').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function (ev) {
        draft.photo = ev.target.result;
        document.getElementById('photoPreview').src = draft.photo;
        document.getElementById('photoPreview').style.display = 'block';
        document.getElementById('photoPlaceholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
});
function adjWeight(delta) {
    draft.weight = Math.max(0.5, Math.round((draft.weight + delta) * 10) / 10);
    updateWeightUI();
}
function updateWeightUI() {
    document.getElementById('weightNum').textContent = draft.weight.toFixed(1);
    const est = Math.round(draft.weight * PRICES[draft.category].rate);
    document.getElementById('estAmt').textContent = est;
}
function buildConfirm() {
    const p = PRICES[draft.category];
    const est = Math.round(draft.weight * p.rate);
    draft.estValue = est;
    const cat = CATS.find(c => c.key === draft.category);
    document.getElementById('confirmSummary').innerHTML = `
    <div class="summary-line"><span>${t('weightLabel') === 'Weight' ? 'Material' : 'सामान'}</span><b>${cat.em} ${t('cat_' + draft.category)}</b></div>
    <div class="summary-line"><span>${t('weightLabel')}</span><b>${draft.weight.toFixed(1)} kg</b></div>
    <div class="summary-line"><span>${t('estValueLabel')}</span><b>₹${est}</b></div>
  `;
    document.getElementById('locStatus').textContent = t('gettingLocation');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            pos => { draft.loc = { lat: pos.coords.latitude, lng: pos.coords.longitude, approx: false }; document.getElementById('locStatus').textContent = t('locationCaptured'); },
            () => { draft.loc = { ...DEFAULT_LOC, approx: true }; document.getElementById('locStatus').textContent = t('locationApprox'); },
            { timeout: 6000 }
        );
    } else {
        draft.loc = { ...DEFAULT_LOC, approx: true };
        document.getElementById('locStatus').textContent = t('locationApprox');
    }
}
function saveLot() {
    const id = 'KC-' + Date.now().toString(36).toUpperCase();
    const lot = {
        id, category: draft.category, weight: draft.weight, photo: draft.photo,
        estValue: draft.estValue, rate: PRICES[draft.category].rate,
        status: 'quoted', createdAt: new Date().toISOString(),
        loc: draft.loc || { ...DEFAULT_LOC, approx: true },
        finalValue: null, paymentStatus: null, recyclerId: null, handover: null, synced: false
    };
    lots.unshift(lot);
    saveLots();
    showToast(t('toastLotSaved'));
    showView('mylots');
}

/* ================= MY LOTS ================= */
function statusPillClass(s) {
    return { draft: 'pill-grey', quoted: 'pill-amber', matched: 'pill-blue', handed_over: 'pill-blue', completed: 'pill-green' }[s] || 'pill-grey';
}
function statusLabel(s) {
    return { draft: t('statusDraft'), quoted: t('statusQuoted'), matched: t('statusMatched'), handed_over: t('statusHanded'), completed: t('statusCompleted') }[s] || s;
}
function renderLotsList() {
    const list = document.getElementById('lotsList');
    if (lots.length === 0) {
        list.innerHTML = `<div class="empty"><span class="em">📦</span>${t('noLotsYet')}</div>`;
        return;
    }
    list.innerHTML = lots.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        const val = l.finalValue !== null ? l.finalValue : l.estValue;
        return `<div class="lotcard" onclick="openLot('${l.id}')">
      <div class="em">${cat.em}</div>
      <div class="mid">
        <div class="nm">${t('cat_' + l.category)} · ${l.weight.toFixed(1)}kg</div>
        <div class="meta"><span class="pill ${statusPillClass(l.status)}">${statusLabel(l.status)}</span></div>
      </div>
      <div class="amt">₹${val}</div>
    </div>`;
    }).join('');
}
function openLot(id) {
    const lot = lots.find(l => l.id === id);
    if (!lot) return;
    if (lot.status === 'quoted') openRecyclerMatch(id);
    else openHandoverRecord(id);
}

/* ================= RECYCLER MATCHING ================= */
function haversine(lat1, lng1, lat2, lng2) {
    const R = 6371, dLat = (lat2 - lat1) * Math.PI / 180, dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function openRecyclerMatch(lotId) {
    const lot = lots.find(l => l.id === lotId);
    const matches = RECYCLERS.filter(r => r.materials === 'all' || r.materials.includes(lot.category))
        .map(r => ({ ...r, dist: haversine(lot.loc.lat, lot.loc.lng, r.lat, r.lng), offered: Math.round(lot.estValue * r.mult) }));
    const authed = matches.filter(m => m.authorized).sort((a, b) => b.offered - a.offered || a.dist - b.dist);
    const unauthed = matches.filter(m => !m.authorized);
    let html = `<h1 class="pagehead">${t('recyclerMatchTitle')}</h1>`;
    if (matches.length === 0) html += `<p class="pagesub">${t('noRecyclers')}</p>`;
    html += authed.map(r => recCardHtml(r, lotId, true)).join('');
    if (unauthed.length) {
        html += `<div class="warnbox">${t('notRecommendedHead')} — ${t('notRecommendedNote')}</div>`;
        html += unauthed.map(r => recCardHtml(r, lotId, false)).join('');
    }
    document.getElementById('sheetContent').innerHTML = html;
    openSheet();
}
function recCardHtml(r, lotId, authorized) {
    return `<div class="rec-card ${authorized ? '' : 'unauth'}">
    <div class="rec-top">
      <div>
        <div class="rec-name">${r.name}</div>
        <div class="rec-meta">${r.dist.toFixed(1)} ${t('distanceAway')} · ${r.pickup ? t('pickupYes') : t('pickupNo')}</div>
      </div>
      <span class="pill ${authorized ? 'pill-green' : 'pill-rust'}">${authorized ? t('authorizedBadge') : t('notAuthorizedBadge')}</span>
    </div>
    <div class="row" style="align-items:center;">
      <div class="grow"><div class="rec-val">₹${r.offered}</div><div style="font-size:11px;color:var(--ink-soft);">${t('offeredValueLabel')}</div></div>
      <button class="btn ${authorized ? 'btn-amber' : 'btn-outline'} btn-sm" ${authorized ? `onclick="confirmHandover('${lotId}','${r.id}')"` : 'disabled'}>${t('selectHandover')}</button>
    </div>
  </div>`;
}
function confirmHandover(lotId, recyclerId) {
    const lot = lots.find(l => l.id === lotId);
    const r = RECYCLERS.find(x => x.id === recyclerId);
    const offered = Math.round(lot.estValue * r.mult);
    lot.status = 'handed_over';
    lot.recyclerId = recyclerId;
    lot.finalValue = offered;
    lot.paymentStatus = 'pending';
    lot.handover = {
        ref: 'HX-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
        time: new Date().toISOString(),
        lat: lot.loc.lat, lng: lot.loc.lng
    };
    saveLots();
    openHandoverRecord(lotId);
}
function openHandoverRecord(lotId) {
    const lot = lots.find(l => l.id === lotId);
    const r = RECYCLERS.find(x => x.id === lot.recyclerId);
    const h = lot.handover;
    const cat = CATS.find(c => c.key === lot.category);
    const dt = h ? new Date(h.time).toLocaleString() : '';
    const waText = encodeURIComponent(`KabadiSetu handover\nRef: ${h ? h.ref : ''}\nMaterial: ${t('cat_' + lot.category)} (${lot.weight}kg)\nRecycler: ${r ? r.name : ''}\nValue: ₹${lot.finalValue}\nTime: ${dt}`);
    document.getElementById('sheetContent').innerHTML = `
    <h1 class="pagehead">${t('handoverTitle')}</h1>
    <div class="refbox"><div class="lb">${t('refLabel')}</div><div class="code">${h ? h.ref : '—'}</div></div>
    <div class="card">
      <div class="summary-line"><span>${cat.em} ${t('cat_' + lot.category)}</span><b>${lot.weight.toFixed(1)}kg</b></div>
      <div class="summary-line"><span>${t('recyclerLabel')}</span><b>${r ? r.name : '—'}</b></div>
      <div class="summary-line"><span>${t('valueLabel')}</span><b>₹${lot.finalValue}</b></div>
      <div class="summary-line"><span>${t('timeLabel')}</span><b>${dt}</b></div>
      <div class="summary-line"><span>${t('gpsLabel')}</span><b>${h ? h.lat.toFixed(3) + ', ' + h.lng.toFixed(3) : '—'}</b></div>
      <div class="summary-line"><span>${t('paymentPending')}</span><b class="pill ${lot.paymentStatus === 'paid' ? 'pill-green' : 'pill-amber'}">${lot.paymentStatus === 'paid' ? t('paymentPaid') : t('paymentPending')}</b></div>
    </div>
    <a class="btn btn-ghost" style="text-decoration:none;margin-bottom:10px;" href="https://wa.me/?text=${waText}" target="_blank">${t('shareWhatsapp')}</a>
    ${lot.paymentStatus !== 'paid' ? `<button class="btn btn-amber" onclick="markPaid('${lot.id}')">${t('markCashReceived')}</button>` : `<button class="btn btn-primary" onclick="closeSheet()">${t('done')}</button>`}
  `;
    openSheet();
}
function markPaid(lotId) {
    const lot = lots.find(l => l.id === lotId);
    lot.paymentStatus = 'paid'; lot.status = 'completed';
    saveLots();
    openHandoverRecord(lotId);
    renderLedger();
}

/* ================= SHEET ================= */
function openSheet() { document.getElementById('sheetBg').classList.remove('hidden'); }
function closeSheet() { document.getElementById('sheetBg').classList.add('hidden'); renderLotsList(); renderLedger(); }

/* ================= LEDGER ================= */
function renderLedger() {
    const paid = lots.filter(l => l.paymentStatus === 'paid');
    const pending = lots.filter(l => l.paymentStatus === 'pending');
    const total = paid.reduce((s, l) => s + l.finalValue, 0);
    const due = pending.reduce((s, l) => s + l.finalValue, 0);
    document.getElementById('ledgerTotal').textContent = '₹' + total;
    document.getElementById('ledgerPending').textContent = '₹' + due;
    document.getElementById('pendingList').innerHTML = pending.length ? pending.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        return `<div class="txn"><span><span class="em">${cat.em}</span>${t('cat_' + l.category)}</span><span>₹${l.finalValue} <button class="btn btn-sm btn-outline" style="margin-left:6px;" onclick="markPaid('${l.id}');renderLedger();">${t('markCashReceived')}</button></span></div>`;
    }).join('') : `<div class="empty" style="padding:16px;">${t('noTransactions')}</div>`;
    document.getElementById('paidList').innerHTML = paid.length ? paid.map(l => {
        const cat = CATS.find(c => c.key === l.category);
        const r = RECYCLERS.find(x => x.id === l.recyclerId);
        return `<div class="txn"><span><span class="em">${cat.em}</span>${t('cat_' + l.category)} · ${r ? r.name.split(' ')[0] : ''}</span><b>₹${l.finalValue}</b></div>`;
    }).join('') : `<div class="empty" style="padding:16px;">${t('noTransactions')}</div>`;
}

/* ================= MORE / SAFETY ================= */
function renderMore() {
    applyLang();
    const pendingSync = lots.filter(l => !l.synced).length;
    document.getElementById('syncSub').textContent = pendingSync ? `${pendingSync} pending` : '✓ up to date';
    document.getElementById('safetyList').innerHTML = [1, 2, 3, 4].map(i => {
        const em = { 1: '🔋', 2: '📺', 3: '🔥', 4: '🧪' }[i];
        return `<div class="safety-card">
      <div class="em">${em}</div>
      <div class="grow">
        <div class="tt">${t('safety' + i + 't')}</div>
        <div class="ds">${t('safety' + i + 'd')}</div>
      </div>
      <button class="listenbtn" onclick="speak('${(t('safety' + i + 't') + '. ' + t('safety' + i + 'd')).replace(/'/g, "\\'")}')"><svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 5V4L8 9H4z"/><path d="M16 8a5 5 0 0 1 0 8"/></svg></button>
    </div>`;
    }).join('');
}
function syncNow() {
    if (!navigator.onLine) { showToast(t('toastNoOffline')); return; }
    lots.forEach(l => l.synced = true);
    saveLots();
    showToast(t('toastSynced'));
    renderMore();
}

/* ================= TOAST ================= */
let toastTimer;
function showToast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
}

/* ================= NET STATUS ================= */
function updateNet() {
    const online = navigator.onLine;
    const el = document.getElementById('netStatus');
    el.classList.toggle('offline', !online);
    document.getElementById('netStatusText').textContent = online ? 'Online' : 'Offline';
}
window.addEventListener('online', updateNet);
window.addEventListener('offline', updateNet);

/* ================= BOOT ================= */
function renderAll() {
    renderPriceBoard();
    renderLotsList();
    renderLedger();
    renderMore();
}
(function init() {
    if (LANG && USERNAME) {
        document.getElementById('userNameDisplay').textContent = USERNAME;
        document.getElementById('avatarInit').textContent = USERNAME.charAt(0).toUpperCase();
        document.getElementById('onboarding').classList.add('hidden');
        applyLang();
        updateNet();
        renderAll();
    } else if (LANG) {
        applyLang();
        showAuth('authLogin');
    } else {
        applyLang();
    }
})();