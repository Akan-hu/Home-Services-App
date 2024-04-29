import { request, gql } from 'graphql-request'

const MASTER_URL =
  'https://api-ap-south-1.hygraph.com/v2/clvdnkhc40gne07w50ddvj52i/master'
const getSlider = async () => {
  const query = gql`
    query GetSlider {
      sliders {
        name
        id
        image {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}
const getCategories = async () => {
  const query = gql`
    query CategoryQuery {
      categories {
        name
        icon {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}
const getBusinessListByCategory = async (category) => {
  const query =
    gql`
    query BusinessList {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        id
        name
        contactPerson
        contactNumber
        address
        about
        email
        category {
          name
          icon {
            url
          }
        }
        images {
          url
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}
const getBusinessLists = async () => {
  const query = gql`
    query BusinessList {
      businessLists {
        id
        name
        contactPerson
        contactNumber
        address
        about
        email
        images {
          url
        }
        category {
          name
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}
const createBooking = async (data) => {
  const mutationQuery =
    gql`
    mutation CreateBooking {
      createBooking(
        data: {
          bookingStatus: Booked,
          userEmail: "` +
    data.userEmail +
    `",
          userName: "` +
    data.userName +
    `",
          date: "` +
    data.date +
    `",
          time: "` +
    data.time +
    `",
          businessList: { connect: { id: "` +
    data.businessid +
    `" } }
        }
      ) {
        id
      }
      publishManyBookings(to: PUBLISHED) {
        count
      }
    }
  `
  const result = await request(MASTER_URL, mutationQuery)
  return result
}
const getUserBookings = async (email) => {
  const query =
    gql`
    query GetUserBookings {
      bookings(orderBy: publishedAt_DESC, where: { userEmail: "` +
    email +
    `" }) {
        time
        userName
        userEmail
        bookingStatus
        date
        id
        businessList {
          id
          images {
            url
          }
          name
          address
          about
          contactPerson
          contactNumber
          email
        }
      }
    }
  `
  const result = await request(MASTER_URL, query)
  return result
}
export default {
  getSlider,
  getCategories,
  getBusinessListByCategory,
  getBusinessLists,
  createBooking,
  getUserBookings,
}
