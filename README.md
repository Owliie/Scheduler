# Scheduler
- Easier communication between small businesses and ordinary clients
- Innovative method of booking services

## Target group
- Business holders like hairdressers, personal trainers etc.
- Clients who want to use the services

## Description
The aim of Scheduler is to provide improved quality of communication between small businesses and ordinary clients. The way it is achieved is by keeping track of appointments on both ends. By keeping track of appointments, structured in specialized calendars, unique for every user, that makes the whole process more pleasant.
It will allow small business holders to deliver their services without any appointment misunderstandings and frustration coming from their clients. Moreover, the business holders will have to be less present on their phone and not worry about missed calls or forgotten appointment dates.

## Function requirements
- User registration – as customer/business holder
- User login
- Favourites
- Services
  - Find a service
  - Filter by business type
- Appointments
  - Book appointment
  - Upcommoming appointments
- Business holder calendar
  - Calendar with the pending and accepted appointments
  - Accept appointment
  - Decline appointment

## Set up guide
- Back-end
  - Go to ```backend``` folder adn run the following commnad in the terminal: ```npm start```
  - Setup your local mongodb connection
- Front-end
  - Go to ```frontend``` folder and run the followig command in the terminal: ```npm start```

## Technologies
- Back-end
  - Typescript
  - Node
  - Express
  - MonogDB
  - Mongoose
- Front-end
  - React
  - Redux

## API docuemntation
- [Authentication and authorization](./docs/api/authentication-and-authorization.md)
- [Business types](./docs/api/business-types.md)
- [Businesses](./docs/api/businesse.md)
- [Favourite businsses](./docs/api/favourite-businesses.md)
- [Book appointment](./docs/api/book-appointment.md)
- [Customer booked services](./docs/api/customer-booked-services.md)
- [Business holder calendar](./docs/api/business-holder-calendar.md)
- [Business holder profile](./docs/api/business-holder-profile.md)
- [Business products](./docs/api/business-products.md)
- [User profile](./docs/api/user-profile.md)

## User documentation
#### When the users open the application, they should login/register in the system. 
- Login
  - Fill the username and password and click the Login button.
- Register
  - Choose registration type; fill the form and click the register button.
#### When users are logged in the system as a customer:
- Search for service by: name, business type.
- When users find a specific service, they are able to click the heart button/ or simply double clicking the service card to add a service to the Favourites section.
- Book an appointment:
  - When the users find the desired service, they should click the “Book now” button.
  - Then the users choose some available hour and fill in the other necessary information about the appointment. Afterwards, they should click the “Create” button and finalize the booking.
  - The appointment will be marked as “pending” and when the business holder approves / denies it, the user will receive a corresponding email notification. 
  - From the customer portal users will be able to see all of their upcoming appointments.
 - From the customer portal users will be able to see all of their upcoming appointments.
 - Favourites section
  - Users will be able to see all of their favourite services and remove a selected one by clicking the “Remove” button. They will also be able to choose a service and book one by clicking the “Book now” button.
#### When users are logged in the system as a business holder:
- The business holder has the same functionalities as the customer.
- Claenar with appointments
  - From this section users can see all their appointment requests and be able to accept/decline it.
