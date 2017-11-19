/**
 * Simple interest based dating app algorithm based on bit manipulation
 */

class DatingApp {
  /**
   * This function takes in an array or a set and creates an interest
   * map where key is original interest string, value is a number
   * representing that interest
   */
  constructor (interestsPool) {
    this.mapInterests = new Map();
    for (let i = 0, item; i < interestsPool.length; ++i) {
      item = interestsPool[i];
      this.mapInterests.set(item, 1 << i);
    }
    console.log('Dating app created with interests:')
    console.log(interestsPool)
  }

  /**
   * This function creates a person profile based on his/her interests
   * and the mapping we created based on all supported interests
   * @param {*} name
   * @param {*} arrInterests
   * @param {*} mapInterests
   */
  buildProfile (name, arrInterests) {
    let person = {name: name, interests: 0};
    for (let item of arrInterests) {
      person.interests |= this.mapInterests.get(item);
    }
    return person;
  }

  getCommonInterests (person1, person2) {
    return person1.interests & person2.interests;
  }

  /**
   * This function takes a person's interests and check against
   * our interests map, and prints out what this person is
   * interested or not interested in
   * @param {*} person
   * @param {*} mapInterests
   */
  getInterestsFor (person) {
    return this.getInterests(person.name, person.interests);
  }

  getInterests (name, interests) {
    let interested = [];
    let notInterested = [];
    for (let key of this.mapInterests.keys()) {
      let interest = this.mapInterests.get(key);
      if ((interests ^ interest) < interests) {
        interested.push(key);
      } else {
        notInterested.push(key);
      } // end if
    } // end for
    console.log(name + ' interested in ', interested);
    console.log(name + ' not interested in ', notInterested);

    return interested;
  }
}

console.log('Run: testDatingApp() to test')

function testDatingApp () {
  let app = new DatingApp(
    [
      'movies', 'music', 'pizza', 'salad', 'sports', 'yoga',
      'tea', 'sushi', 'golf', 'computer science'
    ]
  );

  console.log('creating test profiles: a, b, c, d')
  let a = app.buildProfile('a', ['movies', 'music', 'computer science']);
  let b = app.buildProfile('b', ['music', 'tea']);
  let c = app.buildProfile('c', ['movies', 'music', 'golf', 'sushi']);
  let d = app.buildProfile('d', ['movies', 'music', 'yoga', 'sports']);

  console.log('get common interests between a, b')
  console.log(app.getInterests('a and b ', app.getCommonInterests(a, b))) // prints out the strings instead of number
  console.log(app.getInterests('b and c ', app.getCommonInterests(b, c))) // prints out the strings instead of number
  console.log(app.getInterests('c and d ', app.getCommonInterests(c, d))) // prints out the strings instead of number
}
