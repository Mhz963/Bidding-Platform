let data = {
    "admins": {
        "admin@vitwit.com": {
            "email": "admin@vitwit.com",
            "pwd": "adminpassword",
            "dashboard": [],
            "pending_leaves": [
                "'user1@vitwit.com'|1537298792634|1537298792634|'sick'|'approved/denied/pending'|1537298792634", //start | end | reason | approved/denied/pending | request_timestamp
                "'user2@vitwit.com'|1537298792634|1537298792634|'sick'|'approved/denied/pending'|1537298792634",
            ],
            "approved_leaves": [
                "'user3@vitwit.com'|1537298792634|1537298792634|'sick'|'approved'|1537298792634|1537298792634",//start | end | reason | approved/denied/pending | request_timestamp | approved_timestamp
                "'user3@vitwit.com'|1537298792634|1537298792634|'sick'|'denied'|1537298792634|1537298792634",//start | end | reason | approved/denied/pending | request_timestamp | approved_timestamp
            ]
        },

    },

    "users": {
        "user1@vitwit.com": {
            "email": "user1@vitwit.com",
            "pwd": "user1password",
            "leaves": {
                "my_leave": [
                    "1537298792634|1537298792634|'sick'|'approved/denied/pending'|1537298792634", //start | end | reason | approved/denied/pending | request_timestamp
                ],
                "new_leave": [
                    "1537264878|1537264878|'sick'|'approved/denied/pending'",
                ]
            }
        },

        "123": {
            "email": "Mhz",
            "pwd": "123",
            "leaves": {
                "my_leave": [
                    "1537298792634|1537298792634|'sick'|'approved'|1537298792634", //start | end | reason | approved/denied/pending | request_timestamp
                ],
                "new_leave": [
                    "1536969600|1536969600|'vacation'|'pending'",
                ]
            }
        },
        "user2@vitwit.com": {
            "email": "user2@vitwit.com",
            "pwd": "user2password"
        }
    },
}
export default data


