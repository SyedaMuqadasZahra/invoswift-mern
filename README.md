# InvoPlate - MERN Stack Boilerplate <br/>
Updated: `New Date`
<hr />

Document all updates here
<hr />

Updated: `Thursday 18 Aug, 2022`
<hr />

## <u>Node JS Version</u>
Template was built using the following verions and would recommend using the same or higher for best compatibility and support. 
- Node: 14.17.5
- NPM: 8.5.0
- It is preferred to use Node version from 14-16, version can be switched with "nvm use 14" to switch to node version to 14 i.e if you have NVM installed and multiple version of node installed that you want to use
## <u>Git Practices</u>
To Initialize Custom Commit and Branch checks. Please Run the following commands while in the current directory

- `git config commit.template ./.github/templates/gitmessage`
- `git config core.hooksPath .github/hooks`

## <u>Coding Practices</u>
### Linting and Formating
The Project is configured to ensure you follow the best coding practices using eslint (airbnb guide) and prettier to ensure proper indentation each time, across the development team. 

### Cyclomatic Complexity
<b>Currently available only for server side. </b>
#### <b>Time Complexity</b>
The amount of time taken by an algorithm/program to run, as a function of the length of the input, computed variables and output of that program.

####  <b>Space Complexity</b>
The amount of memory space used by an algorithm/program including the space of input values, declared and reassignment of variables and output for execution of that program. 
#### <b>Validation</b>
To Check and validate this, we have complexity report that is being checked and generated on each commit. You may check `server/complexity-report.md`. This currently is not restricting for complexitylevel. However, we can set it by changing `server/.compexrc` 

## <u>Project Configuration Instructions</u>
- Type `npm run server:install` to install dependencies for server
- Type `npm run client:install` to install dependencies for client
- Type `npm run admin:install` to install dependencies for admin
- Type `npm run automation:install` to install dependencies for automation
- Type `npm run client` to start client side in development mode @ localhost:3000
- Type `npm run admin` to start admin side in development mode @ localhost:3000
- Type `npm run server` to start server side in development mode @ localhost:8000
- Type `npm run automation` to run automations in headless mode
- Type `npm run cronjob` to start server side cronjob independently

#### <u>For Admin Dashboard</u>
- Setup your database configuration in .env file, Check .env.example file.
- Type `npm run admin:migrate` to run the admin side migrations which can be found in server/admin directory.
- Type `npm run admin:undo-migrate` to undo the admin side migrations.
- Type `npm run server` to start the backend server.
- Type `npm run admin` to start the admin template.

## <u>Enviornment Variables</u>
Initialise `.envs` in the respective directories `(./client)` and make sure to copy `.env.example` for all the required variables. If you add a new variable at any time, make sure to add it in the `.env.example` with a dummy value.

### React .env
> Please ensure not to include any sort of private keys or database passwords in client `.env` as those are bundled and deployed with the project itself. 

See Example 
![React_APP_EXPOSED](<./images/react-app.env.png>) 


React .envs are always prefixed with `REACT_APP_VAR_NAME`

### Nodejs .env
Initialise `.envs` in the respective directories `(./server)` and make sure to copy `.env.example` for all the required variables. If you add a new variable at any time, make sure to add it in the `.env.example` with a dummy value.

You should keep your secrets protected here and make sure your server is not directly accessible to deminish the risk of exposing the file. Nodejs does this out of the box. However, server configurations may vary and risk exposing files. You may check this by visiting similar link below
e.g. 
#### yourapi.url/www/html/.env 

</hr>