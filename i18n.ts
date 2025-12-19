import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
    en: {
        translation: {
            // Navigation
            dashboard: "Dashboard",
            tasks: "Task Board",
            materials: "Materials",
            workforce: "Workforce",
            safety: "Safety AI",
            reports: "Project Reports",

            // Common
            location: "Location",
            status: "Status",
            operational: "Operational",
            logIncident: "Log Incident",

            // Dashboard
            pendingTasks: "Pending Tasks",
            workforceActive: "Workforce Active",
            lowInventory: "Low Inventory",
            dailyCompliance: "Daily Compliance",
            productivityTimeline: "Daily Productivity Timeline",
            progress: "Progress",
            aiSiteIntel: "AI Site Intel",
            predictedDelay: "Predicted Delay",
            days: "Days",
            riskScore: "Risk Score",
            runMitigation: "Run Mitigation Scenario",
            criticalTasks: "Critical Tasks",
            immediateAction: "Immediate Action",
            supplyAlerts: "Supply Alerts",
            inventoryAudit: "Inventory Audit",
            orderNow: "Order Now",

            // Tasks
            searchTasks: "Search field tasks...",
            filter: "Filter",
            assignNewTask: "Assign New Task",
            pending: "Pending",
            inProgress: "In Progress",
            delayed: "Delayed",
            completed: "Completed",
            priority: "Priority",
            high: "High",
            medium: "Medium",
            low: "Low",
            deadline: "Deadline",

            // Materials
            materialInventory: "Material Inventory",
            manifestExport: "Manifest Export",
            addStockEntry: "Add Stock Entry",
            nomenclature: "Nomenclature",
            qtyOnHand: "Qty On Hand",
            criticalLevel: "Critical Level",
            lastAudit: "Last Audit",
            stockAlert: "Stock Alert",
            nominal: "Nominal",
            totalAssetValue: "Total Asset Value",
            supplyLeadTime: "Supply Lead Time",
            wasteMetrics: "Waste Metrics",

            // Workforce
            personnelRoster: "Personnel Roster",
            attendance: "Real-time attendance & productivity metrics",
            scanCredentials: "Scan Credentials",
            registerOperator: "Register Operator",
            totalOnSite: "Total On-Site",
            dailyArrivalRate: "Daily Arrival Rate",
            activeManHours: "Active Man-Hours",
            criticalAbsences: "Critical Absences",
            checkIn: "Check-in",
            productivity: "Productivity",
            fieldAnalytics: "Field Analytics Profile",
            registerWorker: "Register Worker",
            present: "Present",
            absent: "Absent",
            late: "Late",

            // Safety AI
            aiVisionInspector: "AI Vision Inspector",
            safetyDescription: "Real-time IS compliance monitoring. Analyze site photography for PPE violations, equipment misuse, and environmental hazards using Gemini Vision Pro.",
            uploadCapture: "Upload Site Capture",
            connectCCTV: "Connect CCTV",
            dailySafetyScore: "Daily Safety Score",
            improvement: "improvement this week",
            activeHazards: "Active Hazards",
            ppeInspections: "PPE Inspections",
            inspectionFeed: "Inspection Feed",
            analyticOverlay: "Analytic Overlay Active",
            scanning: "Scanning Site Artifacts...",
            comparingFrames: "Comparing frames against IS standard 4014",
            inferenceResults: "Inference Results",
            awaitingData: "Awaiting field data injection...",
            complianceScore: "Compliance Score",
            incidentFlags: "Incident Flags",
            systemSummary: "System Summary",
            exportReport: "Export Report",
            issueTicket: "Issue Ticket",
            siteSecure: "SITE SECURE: No active PPE violations detected in this capture.",

            // Reports
            dailyStatusArchitect: "Daily Status Architect",
            generateReports: "Generate executive field reports using AI",
            todayShift: "Today's Shift",
            weeklyRecap: "Weekly Recap",
            monthlyAudit: "Monthly Audit",
            generateReport: "Generate Report",
            dailyFieldReport: "Daily Field Report",
            intelligenceSystems: "BuildSmart Intelligence Systems",
            authenticated: "AUTHENTICATED",
            project: "Project",
            shiftCompletion: "Shift Completion",
            personnelCount: "Personnel Count",
            safetyIncidents: "Safety Incidents",
            logged: "Logged",
            aiGeneratedSummary: "AI Generated Summary",
            authorizedSig: "Authorized Sig.",
            certifiedManager: "Certified Field Manager",
            downloadPDF: "Download PDF",
            dispatchStakeholders: "Dispatch to Stakeholders",
            noReportAvailable: "No Report Available",
            initializeEngine: "Initialize the AI reporting engine by selecting your shift parameters and clicking generate.",

            // Indian specific
            currency: "₹",
            site: "Construction Site"
        }
    },
    hi: {
        translation: {
            // Navigation
            dashboard: "डैशबोर्ड",
            tasks: "कार्य बोर्ड",
            materials: "सामग्री",
            workforce: "कार्यबल",
            safety: "सुरक्षा AI",
            reports: "परियोजना रिपोर्ट",

            // Common
            location: "स्थान",
            status: "स्थिति",
            operational: "चालू",
            logIncident: "घटना दर्ज करें",

            // Dashboard
            pendingTasks: "लंबित कार्य",
            workforceActive: "सक्रिय कार्यबल",
            lowInventory: "कम इन्वेंटरी",
            dailyCompliance: "दैनिक अनुपालन",
            productivityTimeline: "दैनिक उत्पादकता समयरेखा",
            progress: "प्रगति",
            aiSiteIntel: "AI साइट इंटेल",
            predictedDelay: "अनुमानित विलंब",
            days: "दिन",
            riskScore: "जोखिम स्कोर",
            runMitigation: "शमन परिदृश्य चलाएं",
            criticalTasks: "महत्वपूर्ण कार्य",
            immediateAction: "तत्काल कार्रवाई",
            supplyAlerts: "आपूर्ति चेतावनी",
            inventoryAudit: "इन्वेंटरी ऑडिट",
            orderNow: "अभी ऑर्डर करें",

            // Tasks
            searchTasks: "फील्ड कार्य खोजें...",
            filter: "फ़िल्टर",
            assignNewTask: "नया कार्य सौंपें",
            pending: "लंबित",
            inProgress: "प्रगति में",
            delayed: "विलंबित",
            completed: "पूर्ण",
            priority: "प्राथमिकता",
            high: "उच्च",
            medium: "मध्यम",
            low: "निम्न",
            deadline: "समय सीमा",

            // Materials
            materialInventory: "सामग्री सूची",
            manifestExport: "मैनिफेस्ट निर्यात",
            addStockEntry: "स्टॉक प्रविष्टि जोड़ें",
            nomenclature: "नामकरण",
            qtyOnHand: "उपलब्ध मात्रा",
            criticalLevel: "महत्वपूर्ण स्तर",
            lastAudit: "अंतिम ऑडिट",
            stockAlert: "स्टॉक चेतावनी",
            nominal: "सामान्य",
            totalAssetValue: "कुल संपत्ति मूल्य",
            supplyLeadTime: "आपूर्ति समय",
            wasteMetrics: "अपशिष्ट मेट्रिक्स",

            // Workforce
            personnelRoster: "कर्मियों की सूची",
            attendance: "वास्तविक समय उपस्थिति और उत्पादकता मेट्रिक्स",
            scanCredentials: "क्रेडेंशियल स्कैन करें",
            registerOperator: "ऑपरेटर पंजीकृत करें",
            totalOnSite: "साइट पर कुल",
            dailyArrivalRate: "दैनिक आगमन दर",
            activeManHours: "सक्रिय मानव घंटे",
            criticalAbsences: "महत्वपूर्ण अनुपस्थिति",
            checkIn: "चेक-इन",
            productivity: "उत्पादकता",
            fieldAnalytics: "फील्ड एनालिटिक्स प्रोफाइल",
            registerWorker: "कर्मचारी पंजीकृत करें",
            present: "उपस्थित",
            absent: "अनुपस्थित",
            late: "देर से",

            // Safety AI
            aiVisionInspector: "AI विज़न इंस्पेक्टर",
            safetyDescription: "वास्तविक समय IS अनुपालन निगरानी। PPE उल्लंघन, उपकरण दुरुपयोग और पर्यावरणीय खतरों के लिए साइट फोटोग्राफी का विश्लेषण करें।",
            uploadCapture: "साइट कैप्चर अपलोड करें",
            connectCCTV: "CCTV कनेक्ट करें",
            dailySafetyScore: "दैनिक सुरक्षा स्कोर",
            improvement: "इस सप्ताह सुधार",
            activeHazards: "सक्रिय खतरे",
            ppeInspections: "PPE निरीक्षण",
            inspectionFeed: "निरीक्षण फीड",
            analyticOverlay: "एनालिटिक ओवरले सक्रिय",
            scanning: "साइट आर्टिफैक्ट्स स्कैन कर रहे हैं...",
            comparingFrames: "IS मानक 4014 के विरुद्ध फ्रेम की तुलना",
            inferenceResults: "निष्कर्ष परिणाम",
            awaitingData: "फील्ड डेटा इंजेक्शन की प्रतीक्षा में...",
            complianceScore: "अनुपालन स्कोर",
            incidentFlags: "घटना फ्लैग",
            systemSummary: "सिस्टम सारांश",
            exportReport: "रिपोर्ट निर्यात करें",
            issueTicket: "टिकट जारी करें",
            siteSecure: "साइट सुरक्षित: इस कैप्चर में कोई सक्रिय PPE उल्लंघन नहीं मिला।",

            // Reports
            dailyStatusArchitect: "दैनिक स्थिति वास्तुकार",
            generateReports: "AI का उपयोग करके कार्यकारी फील्ड रिपोर्ट उत्पन्न करें",
            todayShift: "आज की शिफ्ट",
            weeklyRecap: "साप्ताहिक सारांश",
            monthlyAudit: "मासिक ऑडिट",
            generateReport: "रिपोर्ट जनरेट करें",
            dailyFieldReport: "दैनिक फील्ड रिपोर्ट",
            intelligenceSystems: "बिल्डस्मार्ट इंटेलिजेंस सिस्टम",
            authenticated: "प्रमाणित",
            project: "परियोजना",
            shiftCompletion: "शिफ्ट पूर्णता",
            personnelCount: "कर्मियों की संख्या",
            safetyIncidents: "सुरक्षा घटनाएं",
            logged: "दर्ज",
            aiGeneratedSummary: "AI जनित सारांश",
            authorizedSig: "अधिकृत हस्ताक्षर",
            certifiedManager: "प्रमाणित फील्ड प्रबंधक",
            downloadPDF: "PDF डाउनलोड करें",
            dispatchStakeholders: "हितधारकों को भेजें",
            noReportAvailable: "कोई रिपोर्ट उपलब्ध नहीं",
            initializeEngine: "अपने शिफ्ट पैरामीटर का चयन करके और जनरेट पर क्लिक करके AI रिपोर्टिंग इंजन को प्रारंभ करें।",

            // Indian specific
            currency: "₹",
            site: "निर्माण स्थल"
        }
    },
    ta: {
        translation: {
            // Navigation
            dashboard: "டாஷ்போர்டு",
            tasks: "பணி பலகை",
            materials: "பொருட்கள்",
            workforce: "பணியாளர்கள்",
            safety: "பாதுகாப்பு AI",
            reports: "திட்ட அறிக்கைகள்",

            // Common
            location: "இடம்",
            status: "நிலை",
            operational: "செயல்பாட்டில்",
            logIncident: "சம்பவத்தை பதிவு செய்",

            // Dashboard
            pendingTasks: "நிலுவையில் உள்ள பணிகள்",
            workforceActive: "செயலில் பணியாளர்கள்",
            lowInventory: "குறைந்த சரக்கு",
            dailyCompliance: "தினசரி இணக்கம்",
            productivityTimeline: "தினசரி உற்பத்தித்திறன் காலவரிசை",
            progress: "முன்னேற்றம்",
            aiSiteIntel: "AI தள நுண்ணறிவு",
            predictedDelay: "கணிக்கப்பட்ட தாமதம்",
            days: "நாட்கள்",
            riskScore: "ஆபத்து மதிப்பெண்",
            runMitigation: "தணிப்பு காட்சியை இயக்கு",
            criticalTasks: "முக்கிய பணிகள்",
            immediateAction: "உடனடி நடவடிக்கை",
            supplyAlerts: "வழங்கல் எச்சரிக்கைகள்",
            inventoryAudit: "சரக்கு தணிக்கை",
            orderNow: "இப்போது ஆர்டர்",
            currency: "₹",
            site: "கட்டுமான தளம்"
        }
    },
    te: {
        translation: {
            // Navigation  
            dashboard: "డాష్‌బోర్డ్",
            tasks: "టాస్క్ బోర్డ్",
            materials: "మెటీరియల్స్",
            workforce: "వర్క్‌ఫోర్స్",
            safety: "సేఫ్టీ AI",
            reports: "ప్రాజెక్ట్ రిపోర్ట్స్",

            // Common
            location: "లొకేషన్",
            status: "స్టేటస్",
            operational: "ఆపరేషనల్",
            logIncident: "ఇన్సిడెంట్ లాగ్",

            // Dashboard
            pendingTasks: "పెండింగ్ టాస్క్‌లు",
            workforceActive: "యాక్టివ్ వర్క్‌ఫోర్స్",
            lowInventory: "తక్కువ ఇన్వెంటరీ",
            dailyCompliance: "డైలీ కాంప్లయన్స్",
            currency: "₹",
            site: "నిర్మాణ స్థలం"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'en', // default language
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
