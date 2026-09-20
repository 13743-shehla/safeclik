import type {
  User,
  TrainingModule,
  PhishingCampaign,
  PhishingTarget,
  SecurityScoreBreakdown,
  OSINTScanResult,
  AdminDashboardData,
  EmployeeDashboardData
} from '../types';

export const mockCurrentUserEmployee: User = {
  id: 'usr-emp-01',
  email: 'alex.rivera@acmecorp.com',
  full_name: 'Alex Rivera',
  role: 'EMPLOYEE',
  department: 'Finance & Accounting',
  job_title: 'Senior Financial Analyst',
  created_at: '2025-01-15T09:00:00Z',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  security_score: 84,
  risk_level: 'LOW',
};

export const mockCurrentUserAdmin: User = {
  id: 'usr-adm-01',
  email: 'sarah.connor@acmecorp.com',
  full_name: 'Sarah Connor',
  role: 'ADMIN',
  department: 'Information Security',
  job_title: 'Head of Cyber Defense',
  created_at: '2024-06-01T08:00:00Z',
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250',
  security_score: 98,
  risk_level: 'LOW',
};

export const mockEmployees: User[] = [
  mockCurrentUserEmployee,
  mockCurrentUserAdmin,
  {
    id: 'usr-emp-02',
    email: 'marcus.vance@acmecorp.com',
    full_name: 'Marcus Vance',
    role: 'EMPLOYEE',
    department: 'Human Resources',
    job_title: 'HR Operations Lead',
    created_at: '2025-02-10T10:00:00Z',
    security_score: 52,
    risk_level: 'HIGH',
  },
  {
    id: 'usr-emp-03',
    email: 'elena.rostova@acmecorp.com',
    full_name: 'Elena Rostova',
    role: 'EMPLOYEE',
    department: 'Engineering',
    job_title: 'Principal Cloud Architect',
    created_at: '2024-08-12T11:00:00Z',
    security_score: 95,
    risk_level: 'LOW',
  },
  {
    id: 'usr-emp-04',
    email: 'david.kim@acmecorp.com',
    full_name: 'David Kim',
    role: 'EMPLOYEE',
    department: 'Sales & Marketing',
    job_title: 'Enterprise Account Exec',
    created_at: '2025-03-01T09:30:00Z',
    security_score: 68,
    risk_level: 'MEDIUM',
  },
  {
    id: 'usr-emp-05',
    email: 'chloe.dupont@acmecorp.com',
    full_name: 'Chloe Dupont',
    role: 'EMPLOYEE',
    department: 'Legal & Compliance',
    job_title: 'Compliance Specialist',
    created_at: '2024-11-20T14:00:00Z',
    security_score: 89,
    risk_level: 'LOW',
  },
  {
    id: 'usr-emp-06',
    email: 'tariq.mansoor@acmecorp.com',
    full_name: 'Tariq Mansoor',
    role: 'EMPLOYEE',
    department: 'Finance & Accounting',
    job_title: 'Accounts Payable Clerk',
    created_at: '2025-04-05T08:15:00Z',
    security_score: 41,
    risk_level: 'CRITICAL',
  },
];

export const mockTrainingModules: TrainingModule[] = [
  {
    id: 'mod-01',
    title: 'Spotting Modern Spear-Phishing & Social Engineering',
    description: 'Learn to identify deceptive executive impersonation, lookalike domains, artificial urgency, and weaponized attachments.',
    category: 'Phishing',
    difficulty: 'Beginner',
    estimated_minutes: 15,
    badge_name: 'Phishing Detector',
    icon: 'Fish',
    completed: true,
    score: 92,
    lessons: [
      {
        id: 'les-01-1',
        module_id: 'mod-01',
        title: 'Anatomy of a Phishing Attack',
        order_index: 1,
        content: `### Understanding the Threat\n\nPhishing remains the #1 initial access vector used by cybercriminals, accounting for over **82% of enterprise breaches**.\n\n#### Key Signs of Spear Phishing:\n1. **Artificial Urgency**: Pressure to bypass normal verification processes.\n2. **Lookalike Domains**: Slight typos like \`acm-corp.com\` instead of \`acmecorp.com\`.\n3. **Mismatched Sender Information**: The display name says 'CEO' but the actual address points to a freemail provider.\n4. **Unsolicited Attachments**: Files like \`.html\`, \`.iso\`, \`.xlsm\` or password-protected archives designed to bypass basic filters.`,
        key_takeaways: [
          'Always inspect the sender address, not just the display name.',
          'Verify sudden requests involving money or credentials via a secondary channel (phone, Slack).',
          'Hover over hyperlinks to preview their genuine destination URL before clicking.'
        ]
      },
      {
        id: 'les-01-2',
        module_id: 'mod-01',
        title: 'Business Email Compromise (BEC) & Executive Impersonation',
        order_index: 2,
        content: `### When the CEO 'Emails' You\n\nExecutive impersonation attacks typically target employees in finance, HR, or legal. They rely on social authority rather than malware.\n\n#### Common BEC Scenarios:\n* "I am in a confidential board meeting. Can you immediately process this wire transfer?"\n* "Please send all employee W-2 tax forms for our audit."\n* "I need you to buy 20 gift cards for a surprise team reward."\n\n**Protocol**: Any change in banking details or urgent fund transfers REQUIRES verbal confirmation via known corporate phone directory.`,
        key_takeaways: [
          'Legitimate executives will never ask you to bypass financial controls via email.',
          'Always authenticate out-of-band for banking coordinate changes.',
          'Click the "Report Phish" button in your email client if you suspect an impersonation attempt.'
        ]
      },
      {
        id: 'les-01-3',
        module_id: 'mod-01',
        title: 'QR Code Phishing (Quishing) & Multi-Channel Attacks',
        order_index: 3,
        content: `### The Rise of Quishing\n\nAttackers increasingly embed **QR codes** inside PDF invoices or fake IT alerts to force employees to use personal smartphones, bypassing corporate browser security filters.\n\n#### Safeguards:\n* Never scan a QR code sent in an email requesting password changes or multi-factor authentication (MFA) resets.\n* Corporate IT will never require QR authentication from a mobile phone for desktop email access.`,
        key_takeaways: [
          'QR codes obscure destination URLs from standard email gateway filters.',
          'Do not use personal devices to scan corporate-themed login QR codes.',
          'Forward suspected quishing emails to the Security Operations Center (SOC).'
        ]
      }
    ],
    quiz: {
      id: 'quiz-01',
      module_id: 'mod-01',
      passing_score: 80,
      questions: [
        {
          id: 'q-01-1',
          quiz_id: 'quiz-01',
          question_text: 'You receive an urgent email from your CEO asking for an immediate wire transfer to a new vendor because of a time-sensitive deal. What is the safest action?',
          options: [
            'Process the payment immediately since it came directly from the CEO.',
            'Reply to the email asking the sender to confirm their identity.',
            'Call the CEO or your designated finance manager using a verified internal number to authenticate the request out-of-band.',
            'Forward the email to your personal account so you have a copy in case of dispute.'
          ],
          correct_answer_index: 2,
          explanation: 'Always verify unexpected fund transfers out-of-band using an established telephone number or direct verbal confirmation. Replying to the fraudulent email keeps you in touch with the attacker.'
        },
        {
          id: 'q-01-2',
          quiz_id: 'quiz-01',
          question_text: 'You receive an email from "Microsoft Security Team" with a link to verify your password before account expiration. When you hover over the link, it shows "http://login.microsoft.security-verify.net". Is this safe?',
          options: [
            'Yes, because it contains "microsoft" and "security-verify".',
            'No, because the actual domain is "security-verify.net", an unauthorized third-party lookalike.',
            'Yes, as long as the email has a Microsoft logo.',
            'Yes, if you enter a temporary password first.'
          ],
          correct_answer_index: 1,
          explanation: 'In domain names, the effective domain is right before the top-level extension (.net). Here, "security-verify.net" is a spoofed domain attempting credential harvesting.'
        },
        {
          id: 'q-01-3',
          quiz_id: 'quiz-01',
          question_text: 'What should you do after identifying a simulated or real phishing email in your inbox?',
          options: [
            'Delete the email and ignore it.',
            'Click the "Report Phishing" button in SafeClick / Outlook so security analysts can block the sender.',
            'Forward the email to all colleagues as a general warning.',
            'Attempt to unsubscribe from the attackers mailing list.'
          ],
          correct_answer_index: 1,
          explanation: 'Reporting the email alerts the SOC, allowing them to extract IOCs (indicators of compromise) and shield all company mailboxes automatically.'
        }
      ]
    }
  },
  {
    id: 'mod-02',
    title: 'Password Hygiene, Credential Stuffing & MFA Defense',
    description: 'Master passphrases, avoid password re-use vulnerabilities, and defend against modern MFA fatigue attacks.',
    category: 'Passwords',
    difficulty: 'Beginner',
    estimated_minutes: 12,
    badge_name: 'Identity Sentinel',
    icon: 'Key',
    completed: true,
    score: 100,
    lessons: [
      {
        id: 'les-02-1',
        module_id: 'mod-02',
        title: 'Passphrases vs Complex Short Passwords',
        order_index: 1,
        content: `### Why Length Trumps Complexity\n\nA 16-character passphrase composed of random words (e.g., \`solar-battery-horse-umbrella\`) has vastly higher mathematical entropy than an 8-character string like \`P@$$w0rd!\`, while being far easier to remember and resistant to GPU cracking rigs.`,
        key_takeaways: [
          'Aim for at least 14-16 characters.',
          'Never reuse work credentials for personal services or external forums.',
          'Utilize an approved enterprise password manager.'
        ]
      },
      {
        id: 'les-02-2',
        module_id: 'mod-02',
        title: 'MFA Fatigue & Push Prompt Bombing',
        order_index: 2,
        content: `### Beware of Repeated Push Notifications\n\nWhen attackers obtain your password, they often trigger dozens of MFA push prompts to your phone in the middle of the night, hoping you will hit "Approve" simply to silence the phone.\n\n**Rule**: Never approve an authentication prompt that you did not actively initiate on your screen.`,
        key_takeaways: [
          'Deny unexpected MFA prompts immediately.',
          'Change your primary password right away if you receive unprompted MFA requests.',
          'Notify the security team if you suspect an MFA bombing attempt.'
        ]
      }
    ],
    quiz: {
      id: 'quiz-02',
      module_id: 'mod-02',
      passing_score: 80,
      questions: [
        {
          id: 'q-02-1',
          quiz_id: 'quiz-02',
          question_text: 'You receive 5 push notifications on your phone asking you to approve a login attempt while you are watching TV. What happened and what should you do?',
          options: [
            'It is a routine system glitch; approve it to clear the notifications.',
            'An attacker has your password and is trying to fatigue you into approving; deny the request and notify Security immediately.',
            'Turn your phone on Airplane mode until morning.',
            'Delete the authenticator app.'
          ],
          correct_answer_index: 1,
          explanation: 'This is an MFA fatigue / push-bombing attack. The attacker already knows your password and needs your approval. Deny and report immediately.'
        }
      ]
    }
  },
  {
    id: 'mod-03',
    title: 'Ransomware Defense: From Suspicious Links to Containment',
    description: 'Understand ransomware execution chains, fake software updates, malicious macros, and emergency containment steps.',
    category: 'Ransomware',
    difficulty: 'Intermediate',
    estimated_minutes: 20,
    badge_name: 'Ransomware Shield',
    icon: 'ShieldAlert',
    completed: false,
    score: undefined,
    lessons: [
      {
        id: 'les-03-1',
        module_id: 'mod-03',
        title: 'How Ransomware Enters the Corporate Network',
        order_index: 1,
        content: `### Infection Vectors\n\nRansomware rarely begins with a Hollywood hacking montage. It almost always enters via:\n1. An employee enabling macros on an Excel invoice attachment.\n2. Downloading a fake browser or video codec update from a compromised webpage.\n3. Reused credentials breached from a third-party website.\n\nOnce inside, attackers move laterally, exfiltrate confidential data, and encrypt backup stores.`,
        key_takeaways: [
          'Never enable macros on files received via email.',
          'Only install software vetted by IT Software Center.',
          'Keep offline or immutable backups of vital work.'
        ]
      },
      {
        id: 'les-03-2',
        module_id: 'mod-03',
        title: 'Emergency Response: Disconnect, Do Not Power Off',
        order_index: 2,
        content: `### If Your Screen Shows a Ransom Note\n\n1. **Unplug Ethernet & Turn Off Wi-Fi**: Instantly stop lateral network spread.\n2. **DO NOT Turn Off Power**: Volatile RAM memory contains encryption keys and forensic evidence needed by incident responders.\n3. **Call Security Hotline immediately** from a mobile phone.`,
        key_takeaways: [
          'Sever network connections immediately (unplug cable, disconnect Wi-Fi).',
          'Leave the machine powered on so RAM memory is preserved for analysis.',
          'Do not negotiate with attackers or attempt to pay ransoms yourself.'
        ]
      }
    ],
    quiz: {
      id: 'quiz-03',
      module_id: 'mod-03',
      passing_score: 80,
      questions: [
        {
          id: 'q-03-1',
          quiz_id: 'quiz-03',
          question_text: 'If you suspect your workstation is infected with ransomware, which physical action should you take FIRST?',
          options: [
            'Shut down the computer using the power button.',
            'Unplug the network cable and turn off Wi-Fi immediately, leaving the computer powered on.',
            'Transfer your personal files to an external USB drive.',
            'Restart into Safe Mode.'
          ],
          correct_answer_index: 1,
          explanation: 'Isolating the device from the network prevents ransomware from encrypting shared company servers, while keeping power on preserves crucial volatile forensic memory (RAM).'
        }
      ]
    }
  },
  {
    id: 'mod-04',
    title: 'Public Wi-Fi, Hotspots & Remote Work Defense',
    description: 'Securing your laptop and communications when traveling, in coffee shops, or working from home.',
    category: 'Remote Work',
    difficulty: 'Beginner',
    estimated_minutes: 10,
    badge_name: 'Nomad Guardian',
    icon: 'Wifi',
    completed: false,
    score: undefined,
    lessons: [
      {
        id: 'les-04-1',
        module_id: 'mod-04',
        title: 'Evil Twin Hotspots & Eavesdropping',
        order_index: 1,
        content: `### Coffee Shop Hazards\n\nAttackers can deploy a \$30 device that broadcasts an open Wi-Fi network named "Starbucks_Guest" or "Airport_Free_WiFi". When you connect, all unencrypted traffic flows through their packet sniffer.\n\n**Golden Rule**: Always enable company VPN before accessing internal systems, or tether via your cellular hotspot.`,
        key_takeaways: [
          'Verify official SSID names with staff.',
          'Always use corporate VPN on public or hotel connections.',
          'Disable automatic Wi-Fi reconnect on corporate laptops.'
        ]
      }
    ],
    quiz: {
      id: 'quiz-04',
      module_id: 'mod-04',
      passing_score: 80,
      questions: [
        {
          id: 'q-04-1',
          quiz_id: 'quiz-04',
          question_text: 'When working from an airport lounge or cafe, what is the safest connection method?',
          options: [
            'Any open public Wi-Fi network that doesn’t require a password.',
            'Your corporate VPN or cellular smartphone hotspot.',
            'Connecting to a network that has the name of the cafe.',
            'Using your browser in Incognito mode.'
          ],
          correct_answer_index: 1,
          explanation: 'Corporate VPN encrypts all tunnel traffic, preventing local packet sniffing and man-in-the-middle attacks on untrusted public networks.'
        }
      ]
    }
  }
];

export const mockPhishingCampaigns: PhishingCampaign[] = [
  {
    id: 'camp-01',
    title: 'Q3 Payroll & Direct Deposit Verification',
    scenario_type: 'HR Payroll Notice',
    email_subject: 'ACTION REQUIRED: Confirm Updated Banking Details for Q3 Payroll',
    sender_name: 'Acme Corp Payroll Services',
    sender_email: 'payroll-update@acme-corp-portal.com',
    email_body_template: 'Hello {{full_name}},\n\nDue to our annual audit, all staff must re-verify their direct deposit routing number prior to Friday 5:00 PM to avoid payroll delay.\n\nPlease log in to the payroll portal to confirm:\nhttps://acme-corp-portal.com/auth/payroll\n\nRegards,\nCorporate Payroll Team',
    status: 'ACTIVE',
    created_at: '2025-08-20T10:00:00Z',
    target_count: 32,
    opened_count: 24,
    clicked_count: 4,
    reported_count: 19,
    click_rate: 12.5,
    report_rate: 59.4,
  },
  {
    id: 'camp-02',
    title: 'Microsoft 365: Urgent Password Expiration Notice',
    scenario_type: 'IT Password Reset',
    email_subject: 'Urgent: Your Microsoft 365 Password Expires in 24 Hours',
    sender_name: 'IT Support Helpdesk',
    sender_email: 'helpdesk@microsoft-auth-support.net',
    email_body_template: 'Attention {{full_name}},\n\nYour domain credentials will expire within 24 hours. Keep your current password by clicking below:\n\nhttps://microsoft-auth-support.net/keep-credentials\n\nFailure to act will lead to account lockout.',
    status: 'COMPLETED',
    created_at: '2025-07-10T14:30:00Z',
    target_count: 50,
    opened_count: 42,
    clicked_count: 7,
    reported_count: 31,
    click_rate: 14.0,
    report_rate: 62.0,
  },
  {
    id: 'camp-03',
    title: 'Confidential Wire Request from CEO',
    scenario_type: 'Urgent CEO Wire',
    email_subject: 'STRICTLY CONFIDENTIAL: Acquisition Wire Transfer',
    sender_name: 'David Sterling (CEO)',
    sender_email: 'd.sterling.acme@gmail-exec-secure.com',
    email_body_template: 'Hi {{full_name}},\n\nI am currently in closing discussions for an acquisition. I need a confidential wire initiated for escrow fees today. Please review the attached pro-forma invoice and acknowledge receipt immediately.\n\nDavid Sterling\nChief Executive Officer',
    status: 'ACTIVE',
    created_at: '2025-09-02T08:15:00Z',
    target_count: 12,
    opened_count: 10,
    clicked_count: 1,
    reported_count: 9,
    click_rate: 8.3,
    report_rate: 75.0,
  }
];

export const mockEmployeeSimulations: PhishingTarget[] = [
  {
    id: 'sim-01',
    campaign_id: 'camp-01',
    campaign_title: 'Q3 Payroll & Direct Deposit Verification',
    user_id: 'usr-emp-01',
    user_name: 'Alex Rivera',
    user_email: 'alex.rivera@acmecorp.com',
    department: 'Finance & Accounting',
    status: 'REPORTED',
    tracking_token: 'tok-q3-payroll-alex',
    sent_at: '2025-08-20T10:05:00Z',
    interacted_at: '2025-08-20T10:22:00Z',
  },
  {
    id: 'sim-02',
    campaign_id: 'camp-02',
    campaign_title: 'Microsoft 365: Urgent Password Expiration Notice',
    user_id: 'usr-emp-01',
    user_name: 'Alex Rivera',
    user_email: 'alex.rivera@acmecorp.com',
    department: 'Finance & Accounting',
    status: 'REPORTED',
    tracking_token: 'tok-m365-alex',
    sent_at: '2025-07-10T14:32:00Z',
    interacted_at: '2025-07-10T14:45:00Z',
  },
  {
    id: 'sim-03',
    campaign_id: 'camp-03',
    campaign_title: 'Confidential Wire Request from CEO',
    user_id: 'usr-emp-01',
    user_name: 'Alex Rivera',
    user_email: 'alex.rivera@acmecorp.com',
    department: 'Finance & Accounting',
    status: 'REPORTED',
    tracking_token: 'tok-wire-alex',
    sent_at: '2025-09-02T08:18:00Z',
    interacted_at: '2025-09-02T08:29:00Z',
  }
];

export const mockSecurityScore: SecurityScoreBreakdown = {
  overall: 84,
  risk_level: 'LOW',
  training_score: 96,
  phishing_resilience: 88,
  incident_reporting_rate: 100,
  last_updated: '2025-09-12T14:00:00Z',
  trend: '+6',
  factors: [
    {
      name: 'Phishing Simulation Awareness',
      score: 88,
      weight: '40%',
      status: 'good',
      description: 'Zero malicious links clicked in the last 6 simulated campaigns; 3 reported within 15 minutes.'
    },
    {
      name: 'Mandatory Training Completion',
      score: 96,
      weight: '30%',
      status: 'good',
      description: 'Completed 2 out of 4 modules with average quiz score of 96%.'
    },
    {
      name: 'Incident Reporting Response Time',
      score: 100,
      weight: '20%',
      status: 'good',
      description: 'Average response time of 14 minutes from email delivery to SOC notification.'
    },
    {
      name: 'Credential Safety & Password Policy',
      score: 75,
      weight: '10%',
      status: 'warning',
      description: 'Password last rotated 82 days ago. MFA is active and properly enrolled.'
    }
  ]
};

export const mockOSINTScanResult: OSINTScanResult = {
  domain: 'acmecorp.com',
  scan_date: '2025-09-14T16:00:00Z',
  exposure_score: 34,
  risk_level: 'LOW',
  mail_security: {
    spf_record: true,
    dmarc_record: true,
    mx_records_found: true,
    details: 'v=spf1 include:_spf.google.com ~all | DMARC policy=reject with p=reject 100% enforced.'
  },
  exposed_credentials_sample: 3,
  public_employee_profiles: 48,
  vulnerability_indicators: [
    '3 email addresses found in historical third-party data breaches (LinkedIn 2012, Canva 2019).',
    'Subdomain dev-staging.acmecorp.com exposes banner headers revealing Apache version.',
    'DNS zone transfer is disabled (Secure).'
  ],
  recommendations: [
    'Enforce mandatory credential rotation for employees with historical third-party breach records.',
    'Hide web server signature headers on non-production subdomains.',
    'Implement dark web credential monitoring for all corporate @acmecorp.com email aliases.'
  ]
};

export const mockAdminDashboardData: AdminDashboardData = {
  total_employees: 64,
  average_security_score: 76,
  phishing_click_rate: 11.2,
  training_completion_rate: 78.5,
  active_campaigns_count: 2,
  high_risk_employee_count: 5,
  department_stats: [
    { department: 'Finance & Accounting', employee_count: 8, avg_score: 68, click_rate: 14.2 },
    { department: 'Engineering', employee_count: 22, avg_score: 92, click_rate: 4.5 },
    { department: 'Human Resources', employee_count: 7, avg_score: 64, click_rate: 18.0 },
    { department: 'Sales & Marketing', employee_count: 19, avg_score: 71, click_rate: 13.5 },
    { department: 'Legal & Executive', employee_count: 8, avg_score: 85, click_rate: 6.2 },
  ],
  recent_campaigns: mockPhishingCampaigns,
  recent_activity: [
    {
      id: 'act-01',
      timestamp: '10 mins ago',
      description: 'Reported simulated phishing email: Q3 Payroll Notice',
      type: 'report',
      user: 'Alex Rivera (Finance)'
    },
    {
      id: 'act-02',
      timestamp: '42 mins ago',
      description: 'Completed module: Spotting Modern Spear-Phishing (Score: 100%)',
      type: 'complete',
      user: 'David Kim (Sales)'
    },
    {
      id: 'act-03',
      timestamp: '2 hours ago',
      description: 'Clicked simulated link in: Q3 Payroll Notice',
      type: 'click',
      user: 'Tariq Mansoor (Finance)'
    },
    {
      id: 'act-04',
      timestamp: '1 day ago',
      description: 'Launched simulation campaign: Confidential Wire Request',
      type: 'campaign',
      user: 'Sarah Connor (Security)'
    }
  ]
};

export const mockEmployeeDashboardData: EmployeeDashboardData = {
  user: mockCurrentUserEmployee,
  security_score: mockSecurityScore,
  active_modules: mockTrainingModules,
  recent_simulations: mockEmployeeSimulations,
  badges: [
    {
      name: 'Phish Guard Level 1',
      icon: 'ShieldCheck',
      earned_date: 'Aug 2025',
      description: 'Successfully identified and reported 3 consecutive phishing simulations.'
    },
    {
      name: 'Security Scholar',
      icon: 'Award',
      earned_date: 'Jul 2025',
      description: 'Passed two certification training modules with a score higher than 90%.'
    },
    {
      name: 'Zero-Click Hero',
      icon: 'Zap',
      earned_date: 'Jun 2025',
      description: 'Maintained 0% click rate across all company vulnerability drills.'
    }
  ],
  quick_tips: [
    'Always inspect the sender address after the @ symbol, not just the display name.',
    'Never verify suspicious financial requests using the email thread itself; phone your colleague directly.',
    'Remember: IT staff will never ask for your password or prompt you for an unrequested MFA code.'
  ]
};
