
const service = require('./src/service')
const admin = require('./configuration/firebase').admin
const db = admin.firestore()
const context = {
    admin, db, params: process.argv
}


const run = async () => {
    const params = context.params.slice(2)
    const executionType = params[0]
    if (!executionType) {
        return Promise.reject("Executor not found! " + executionType)
    } else {
        switch (executionType) {
            case 'createUserFirestore':
                context.userData = require('./test/payload/user.json')
                return service.userService.createUserFirestore(context)
            case 'updateMenus':
                return service.menuService.updateMenus(context)
            case 'createUserData':
                context.userUid = params[1]
                context.userActivitySummaryData = require('./test/payload/userDataMock1.json').activity
                return service.activityService.updateUserActivitySummaryData(context)
        }
    }
}

// Runner
run(context)
    .then(success => console.log('Success: \n\n ' + JSON.stringify(success)))
    .catch(err => console.error('Error: \n\n ' + err))