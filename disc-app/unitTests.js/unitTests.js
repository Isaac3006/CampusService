import AddEventForm from '../src/Components/AddEventForm';
import EditEventForm from '../src/Components/EditEventForm';
import Login from '../src/Components/Login';
import Event from '../src/Components/Event';
//import AddEventForm from '../src/Components/AddEventForm';
function stringToDate(string) {
  let splittedString = string.split("/");
  let day = parseInt(splittedString[0]);
  let month = parseInt(splittedString[1]) - 1;
  let year = parseInt(splittedString[2]);
  return new Date(year, month, day, 0, 0, 0, 0);
}
function checkInputLogicEditPage(vals) {
    let noWSpace = vals.date.replace(/\s/g, "");
    let noWSpace1 = vals.desc.replace(/\s/g, "");
    let noWSpace3 = vals.host.replace(/\s/g, "");
    let noWSpace4 = vals.location.replace(/\s/g, "");
    let noWSpace5 = vals.time.replace(/\s/g, "");
    let noWSpace6 = vals.title.replace(/\s/g, "");
    let noWSpace7 = toString(vals.capacity).replace(/\s/g, "");

    if (noWSpace.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace1.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }

    if (noWSpace3.length === 0) {
      alert("Please enter valid informration.");
      return false;
      // 
    }
    if (noWSpace4.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace5.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace6.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace7.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
}
function removePeople(removeList, original) {
    for (let i = 0; i < removeList.length; i++) {
      let arrIndex = original.indexOf(removeList[i]);

      if (arrIndex != -1) {
        original.splice(arrIndex, 1);
      }
    }
}
function checkLoginInput(name) {
    const nameNoWhitespace = name.replace(/\s/g, "");
    if (nameNoWhitespace.length === 0) {
      //alert("Invalid input. Enter appropriate name.");
      return false;
    }
    return true;
}
function checkInputLogicAddPage(vals) {
    
    let noWSpace = vals.date.replace(/\s/g, "");
    let noWSpace1 = vals.desc.replace(/\s/g, "");
    // let noWSpace2 = docId.replace(/\s/g, "");
    let noWSpace3 = vals.host.replace(/\s/g, "");
    let noWSpace4 = vals.location.replace(/\s/g, "");
    let noWSpace5 = vals.time.replace(/\s/g, "");
    let noWSpace6 = vals.title.replace(/\s/g, "");

    if (noWSpace.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace1.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }

    if (noWSpace3.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace4.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace5.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
    if (noWSpace6.length === 0) {
      alert("Please enter valid informration.");
      return false;
    }
}
function tests() {
    describe("Check if participants are removed correctly", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = ["Sushant", "Anish", "Srihita", "Isaac", "Noor"];
          a = removePeople(["Anish", "Isaac"],
          ["Sushant", "Anish", "Srihita", "Isaac", "Noor"]);
      
          expect(res).toBe(["Sushant", "Srihita", "Noor"]);
        });
      });
      describe("Check if participants are removed correctly (EDGE CASE)", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = [];
          a = removePeople(["Anish", "Isaac"],
          res);
      
          expect(res).toBe(["Sushant", "Srihita", "Noor"]);
        });
      });
    
    
    describe("Check if information is processed correctly when input is correct in the addPage", function() {
        let sendInfo = {
            createdAt: "12:20",
        
            date: "2-23-22",
        
            desc: "desc",
        
            docId: "",
        
            host: "",
        
            img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",
        
            location: "CULC",
        
            time: "1230",
        
            title: "2340 study",
        
            participantList: "",
        
            inviteOnly: "",
        
            capacity: "",
          };
      
        it("and so is a spec", function() {
           let res = sendInfo
      
          expect(checkInputLogicAddPage(res)).toBe(true);
        });
      });
    describe("Check if information is processed correctly when input is incorrect in the addPage", function() {
        let sendInfo = {
            createdAt: "12:20",
        
            date: "2-23-22",
        
            desc: "",
        
            docId: "",
        
            host: "",
        
            img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",
        
            location: "CULC",
        
            time: "1230",
        
            title: "2340 study",
        
            participantList: "",
        
            inviteOnly: "",
        
            capacity: "",
          };
      
        it("and so is a spec", function() {
           let res = sendInfo
      
          expect(res).toBe(false);
        });
      });
    
      describe("Check if information is processed correctly when input is incorrect in the EditPage", function() {
        let sendInfo = {
            createdAt: "12:20",
        
            date: "2-23-22",
        
            desc: "",
        
            docId: "",
        
            host: "",
        
            img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",
        
            location: "CULC",
        
            time: "1230",
        
            title: "2340 study",
        
            participantList: "",
        
            inviteOnly: "",
        
            capacity: "",
          };
      
        it("and so is a spec", function() {
           let res = sendInfo
      
          expect(checkInputLogicEditPage(res)).toBe(false);
        });
      });
      describe("Check if information is processed correctly when input is correct in the EditPage", function() {
        let sendInfo = {
            createdAt: "12:20",
        
            date: "2-23-22",
        
            desc: "desc",
        
            docId: "",
        
            host: "",
        
            img: "https://brand.gatech.edu/sites/default/files/inline-images/GTVertical_RGB.png",
        
            location: "CULC",
        
            time: "1230",
        
            title: "2340 study",
        
            participantList: "",
        
            inviteOnly: "",
        
            capacity: "",
          };
      
        it("and so is a spec", function() {
           let res = sendInfo
      
          expect(checkInputLogicEditPage(res)).toBe(true);
        });
      });

      describe("Check if login information is processed correctly when input is correct", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = "Isaac";
      
          expect(checkLoginInput(res)).toBe(true);
        });
      });
      describe("Check if login information is processed correctly", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = "";
      
          expect(checkLoginInput(res)).toBe(false);
        });
      });
      describe("Check if date is processed correctly", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = "";
      
          expect(stringToDate("11/12/2113")).toBe(Date(11, 12, 2113));
        });
      });
      describe("Check if date is processed correctly", function() {
        let a;
      
        it("and so is a spec", function() {
           let res = "";
      
          expect(stringToDate("12/12/2113")).toBe(Date(12, 12, 2113));
        });
      });


}
