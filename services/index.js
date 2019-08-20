import { formatData } from "utils/formatData";
import { AVAILABLE_COUNTRIES } from "constants";
import fetchData from "./fetch";

const endpoint = process.env.REACT_APP_APRENDIENDO_API_URL;

class AprendiendoService {
  static async getCourses(
    page,
    universityId,
    categoryId,
    teacherArrayId,
    query,
    token,
    perPage = 12
  ) {
    const universityRequest = universityId
      ? `&search=university_id:${universityId}`
      : `&country_id=${AprendiendoService.getCountry().id}`;
    const queryRequest = query ? `&name=${query}` : "";
    const teacherRequest =
      universityId && teacherArrayId > 0 ? `;teacher_id:${teacherArrayId}` : "";

    let categoryRequest = "";

    switch (categoryId) {
      case 1:
        categoryRequest = "&is_new=true";
        break;

      case 3:
        categoryRequest = universityId ? ";is_free:1" : "&search=is_free:1";
        break;

      case 4:
        categoryRequest = "&release_date=true";
        break;

      default:
        categoryRequest = "";
    }

    const headersObj = {
      "Content-Type": "application/json",
      "Client-Application": "web"
    };

    if (token) {
      headersObj.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetchData({
        method: "get", // eslint-disable-next-line
        url: `${endpoint}/api/courses?page=${page}&per_page=${perPage}${universityRequest}${teacherRequest}${categoryRequest}&searchJoin=and&${queryRequest}&include=teacher,university`,
        headers: headersObj
      });

      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getCourse(id, token) {
    try {
      const headersObj = {
        "Content-Type": "application/json"
      };

      if (token) {
        headersObj.Authorization = `Bearer ${token}`;
      }

      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/courses/${id}?include=markers,university,teacher,lessons,reviews.user`,
        headers: headersObj
      });

      return response;
    } catch (error) {
      return {
        error: true,
        code: error.response.status
      };
    }
  }

  static async getCoursesByUniversityId(id) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/universities/${id}/courses`,
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response;
    } catch (error) {
      return {
        error: true,
        code: error.response.status
      };
    }
  }

  static async getPackages(id, withMarkers = false) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/courses/${id}/packages${
          withMarkers ? "?include=markers,course,course.university" : ""
        }`
      });

      return response;
    } catch (err) {
      return {
        error: true
      };
    }
  }

  static async getPackage(id) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/packages/${id}?include=course,course.university`
      });

      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getSinglePackage(id) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/packages/${id}?include=markers`
      });
      return response;
    } catch (err) {
      return {
        error: true
      };
    }
  }

  static async searchCourses(page, query) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/courses/search?page=${page}&&per_page=12&&name=${query}`,
        headers: {
          "Content-Type": "application/json"
        }
      });

      const formattedResponse = formatData(response, "university");

      return formattedResponse;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getUniversities(param, token) {
    const headersObj = {
      "Content-Type": "application/json"
    };

    if (token) {
      headersObj.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/universities?search=country_id:${
          AprendiendoService.getCountry().id
        }&per_page=1000${param ? `&include=${param}` : ""}`,
        headers: headersObj
      });

      const formattedResponse = formatData(response);

      return formattedResponse;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getCareers(universityId) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${
          process.env.REACT_APP_APRENDIENDO_API_URL
        }/api/careers?university=${universityId}`,
        headers: {
          "Content-Type": "application/json"
        }
      });
      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getTeachers(university) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/university/${university}/teachers`,
        headers: {
          "Content-Type": "application/json"
        }
      });

      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getCurrentUser(token, page) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/users/current?page=${page}&&per_page=12`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  // FIXME: Remove isPremium parameter after remove of premium experiment
  static async processCheckout(token, body, isPremium = false) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/orders/${isPremium ? "subscription" : ""}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });

      return response;
    } catch (error) {
      return {
        error: true,
        response: error.response
      };
    }
  }

  static async updateCart(body, token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/carts`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async removeItemCart(rowId, token) {
    try {
      const response = await fetchData({
        method: "delete",
        url: `${endpoint}/api/carts/${rowId}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      return console.log(error);
    }
  }

  static async getCart(token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/carts`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async saveSubject(token, subjectId) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/users/subject/${subjectId}/seen`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getUserActivities(token, { user, course, lesson, subject }) {
    try {
      const { data } = await fetchData({
        method: "get",
        url: `${endpoint}/api/activities/?search=user_id:${user};course_id:${course};lesson_id:${lesson};subject_id:${subject}&searchJoin=and`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async patchActivities(token, body, id) {
    try {
      const response = await fetchData({
        method: id ? "patch" : "post",
        url: `${endpoint}/api/activities/${!id ? "" : id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });

      return response;
    } catch (error) {
      return {
        errorStatus: error.response.status,
        errorData: error.response.data
      };
    }
  }

  static async savePollResult(token, body) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/poll_results`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });

      return response;
    } catch (error) {
      return {
        errorStatus: error.response.status,
        errorData: error.response.data
      };
    }
  }

  static async getPollResultByUserId(token, userId, courseId) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/poll_results?user_id=${userId}&course_id=${courseId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      return response;
    } catch (err) {
      return {
        error: true
      };
    }
  }

  static async updateUserEnrollment(courseId, token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/enrollments/free`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({
          course_id: courseId
        })
      });
      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getUserAccess(token) {
    try {
      const { data } = await fetchData({
        method: "get",
        url: `${endpoint}/api/users/access?include=acquired_lessons,course.university,course.teacher`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getProgressFromEnrollments(token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/users/progress`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async getAuthenticatedUser(token) {
    try {
      const { data } = await fetchData({
        method: "POST",
        url: `${endpoint}/api/auth/me`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return data;
    } catch (error) {
      return {
        error: true
      };
    }
  }

  static async verifyEmail(body) {
    try {
      const response = await fetchData({
        method: "patch",
        url: `${endpoint}/api/users/verify-email`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: JSON.stringify(body)
      });

      return response;
    } catch (error) {
      return {
        errorStatus: error.response.status,
        errorData: error.response.data
      };
    }
  }

  static async patchEnrollment(body, id, token) {
    try {
      const response = await fetchData({
        method: "patch",
        url: `${endpoint}/api/enrollments/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });

      return response;
    } catch (error) {
      return {
        errorStatus: error.response.status,
        errorData: error.response.data
      };
    }
  }

  static getCountry() {
    const countryCode =
      typeof window !== "undefined"
        ? localStorage.getItem("country_code")
        : "pe";
    const countryObject =
      countryCode in AVAILABLE_COUNTRIES
        ? AVAILABLE_COUNTRIES[countryCode]
        : AVAILABLE_COUNTRIES.PE;
    return countryObject;
  }

  static async validateCouponCode(coupon, token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/coupons/validate?code=${coupon}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async quizSubmission(body, token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/quiz_submissions`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify(body)
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getMyBillingInfo(token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/me/billing-info`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getMySubscription(token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/me/subscription?include=plan`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getPlans() {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/plans`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getInhousePlans() {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/plans/inhouse/list`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getPlan(planId) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/plans/${planId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getBarriers(token, params) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/barriers/freemium?course_id=${params.courseId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async subscribe(token, body) {
    try {
      return await fetchData({
        method: "post",
        url: `${endpoint}/api/orders/subscription`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        },
        data: body
      });
    } catch (error) {
      return error.response;
    }
  }

  static async unsubscribe(token, id, churnReasons) {
    try {
      const response = await fetchData({
        method: "delete",
        url: `${endpoint}/api/subscriptions/${id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: churnReasons
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async freeze(token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/subscriptions/freeze`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async unfreeze(token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/subscriptions/unfreeze`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async migrate(token) {
    try {
      const response = await fetchData({
        method: "post",
        url: `${endpoint}/api/subscriptions/migrate`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  // FOR TEST PURPOSE ONLY!
  static async login({ email, password }) {
    try {
      const response = await fetchData({
        method: "POST",
        url: `${endpoint}/api/auth/login`,
        data: {
          email,
          password
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async updatePassword(token, values) {
    try {
      return await fetchData({
        method: "POST",
        url: `${endpoint}/api/password/reset`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          current_password: values.currentPassword,
          password: values.newPassword,
          password_confirmation: values.confirmPassword,
          token
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  static async updateUser(token, universityId, userId) {
    try {
      return await fetchData({
        method: "POST",
        url: `${endpoint}/api/users/${userId}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
        data: {
          university_id: universityId
        }
      });
    } catch (error) {
      return error.response;
    }
  }

  static async getCurrentMinutsConsumed(token, options) {
    if (!options.courseId) {
      return { errorMessage: "CourseId is missing" };
    }

    let query = "";

    if (options.range) {
      query += `?date_since=${options.range.from}&date_until=${
        options.range.to
      }`;
    }

    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/view-stats/summarizeByCourseId/${
          options.courseId
        }${query}`,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getBitlyLink(userId) {
    const data = {
      group_id: process.env.BITLY_GROUP_ID,
      long_url: `${process.env.APP_URL}/${
        this.getCountry().countryCode
      }/registro?referral_id=${userId}`
    };

    try {
      const response = await fetchData({
        method: "POST",
        url: "https://api-ssl.bitly.com/v4/shorten",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.BITLY_GENERIC_ACCESS_TOKEN}`
        },
        data: JSON.stringify(data)
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async applyNextMonthDiscount(
    token,
    referredIds,
    isNewSubscription = false
  ) {
    try {
      const response = await fetchData({
        method: "POST",
        url: `${endpoint}/api/users/apply/referred`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({
          referred_ids: referredIds,
          is_new_subscription: isNewSubscription
        })
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getNextPaymentAmount(token) {
    try {
      const response = await fetchData({
        method: "get",
        url: `${endpoint}/api/subscriptions/next/payment`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async attachReferrer(token, referredId) {
    try {
      const response = await fetchData({
        method: "POST",
        url: `${endpoint}/api/users/attach/referrer`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        data: JSON.stringify({
          referrer_id: referredId
        })
      });
      return response;
    } catch (error) {
      return error.response;
    }
  }

  static async getCardInformation(token, stripeToken) {
    try {
      const response = await fetchData({
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        url: `https://aprendiendo-api-testing.herokuapp.com/api/subscriptions/test/customer`,
        data: JSON.stringify({
          stripe_card_token: stripeToken.id
        })
      });

      return response;
    } catch (err) {
      return {
        error: true
      };
    }
  }
}

export default AprendiendoService;
