function processDates() 
{
  	// actual processing code goes here
  	input = document.getElementById("date").value;
  	place = document.getElementById("result");

   	//RegEx for mm/dd/yyyy format
   	var dateREGEX = /^\d{1,2}\/\d{1,2}\/\d{2,4}/;

  	//RegEx for standard string format "September 21, 2005"
  	var dateStringREGEX = /([A-Za-z]+\s[0-9]{1,2}[,]+\s[0-9]{4})/;

	//Initialize a bool to check validity.
	var valid_date = false;

	//Array of names of Month.
	var monthNames = ["January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December" ];

	var month, date, year;

	if (input.match(dateREGEX))
	{
		var each = input.split("/");
		month = parseInt(each[0]);
		date = parseInt(each[1]);
		year = each[2];

   		//When year is two digits, assume it starts with 20 when digits are between 00 and 49, 
   		//and assume it starts with 19 when digits are between 50 and 99.
   		if (year.length == 2)
   		{
   			if ((parseInt(year) >= 0) && (parseInt(year) <= 49))
   			{
   				year = "20" + year;
   			}
   			else if ((parseInt(year) >= 50) && (parseInt(year) <= 99))
   			{
   				year = "19" + year;
   			}
   		} 

   		year = parseInt(year);

   		//Call the function to check the validity of the date.
   		valid_date = checkDates(year, month, date);
   	}
   	else if (input.match(dateStringREGEX))
   	{
   		var stringEach = input.split(" ");
   		var monthString = stringEach[0];
   		date = parseInt(stringEach[1].substring(0,2));
   		year = parseInt(stringEach[2]);

   		month = (monthNames.indexOf(monthString)) + 1;

   		//Call the function to check the validity of the date.
   		valid_date = checkDates(year, month, date);
   	}
}

function checkDates(year, month, date)
{
   	var valid_date = false;
   	var monthNames = ["January", "February", "March", "April", "May", "June",
   	"July", "August", "September", "October", "November", "December" ];
   	var daysName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

   	var report = "";

	//Check the range of month.
	if ((month > 12) || (month < 1))
	{
		report = " Month out of range,";
	}

	//Check the range of date.
	if ((date > 31) || (date < 1))
	{
		report += " Date out of range,";
	}

	//Check the range of year.
	if (year >= 1950 && year <= 2049)
	{
		//Month 4,6,9 and 11 has max of 30 days.
		if(((month == 4) || (month == 6) || (month == 9) || (month == 11)) && (date >= 1) && (date <= 30))
		{
			valid_date = true;
		}
		//Month 1,3,5,7,8, 10 and 12 has max of 31 days.
		else if (((month == 1) || (month == 3) || (month == 5) || (month == 7) || (month == 8) || (month == 10) || (month == 12)) && (date >= 1) && (date <= 31))
		{
			valid_date = true;
		}
		//Check for leap year for Month 2.
		else if ((month == 2) && (date >= 1) && (date <= 29))
		{
			if (((year % 4 ==+ 0) && (year % 100 !== 0)) || (year % 400 === 0))
			{
				valid_date = true;
			}
			else if (date <= 28)
			{
				valid_date = true;
			}
			else
			{
				report += year + " is not a leap year";
			}
		}
		else
		{
			report += "<br/>" + "The date you entered is not valid.";
		}
	}
	else
	{
		report += " Year out of range";		
	}

	//Call zeller function to determine the day name.
	var zeller_number = zeller(month, date, year);

	//Print out the results with comments.
	place.innerHTML = "STANDARDIZED VERSION: " +  daysName[zeller_number] + ", " + monthNames[month - 1] + " " + date + ", " + year + "<br/>" + "VALIDITY OF THE DATE : " + valid_date.toString() + "<br/>"+ report;

	return valid_date;
}

//Zeller Congruence is an algorithm that will calculate the day of the week, given any day, month and year.
function zeller(month, date, year)
{
	if (month < 3) 
	{ 
		month += 10; 
		year -= 1; 
	}
	else
	{
		month -= 2;
	}

	var str_year = year.toString();
	var century = parseInt(str_year.substring(0,2));
	var year_century = year % 100;

    //Zeller's math
    var day_number = (Math.floor((26*month - 2)/10) + date + year_century + Math.floor(year_century/4) + Math.floor(century/4) + (5 * century)) % 7;
    return day_number;
}

window.onload = function() 
{
	thebutton = document.getElementById("process");
	thebutton.onclick = processDates;
}
