# TODO

## Modules

- [ ] Auth
- [ ] User
- [ ] Admin
- [ ] Wallet
- [ ] Product
- [ ] Cart
- [ ] Order
- [ ] Shipment
- [ ] Upload

### Utils
- [x] hash function (2026-02-07)
- [ ] multer for upload

### Auth

- [ ] service
    - [X] login
    - [ ] register
- [X] session
- [X] middleware
    - [X] requireAuth
    - [X] requireAdmin
- [ ] views
    - [ ] register
    - [X] login
    - [ ] logout

### User (Admin, Customer) isAdmin = true, false
- [X] model
    - [X] User
    - [X] BasicAuth
- [X] seed for admin
- [ ] service
    - [ ] create new user
    - [ ] get all users
    - [ ] get an user by id
    - [ ] update an user
    - [ ] delete an user
    - [ ] reset user's password

- [ ] views
    - [ ] me
        - [ ] view profile
        - [ ] update profile
        - [ ] delete me
    - [ ] admin
        - [ ] list users
        - [ ] create new user
        - [ ] view user's profile
        - [ ] update user's profile
        - [ ] delete an user
        - [ ] reset user's password
