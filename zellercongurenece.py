#Nischal Shrestha
#10/06/2015
#Zeller's Congruence

def get_valid_date():
        
    user_date = input("Enter a date in the form of mm/dd/yyyy: ")
    valid_date = False
    
    while not valid_date:
        
        month, date, year = user_date.split("/")
        
        month = int(month)
        date = int(date)
        year = int(year)

        if year >= 1700 and year <= 2100:
            if month in [4, 6, 9, 11] and date >= 1 and date <= 30:
                valid_date = True
            elif month in [1, 3, 5, 7, 8, 10, 12] and date >= 1 and date <= 31:
                valid_date = True
            elif month == 2 and date >= 1 and date <= 29:
                if  (year % 4) == 0:
                    if year % 100 == 0:
                        if year % 400 == 0:
                            valid_date = True
                        else:
                            if date <= 28:
                                valid_date = True
                    else:
                        valid_date= True
                else:
                    if date <= 28:
                        valid_date = True              
        else:
            valid_date = False

        if valid_date == False:
            print ("Invalid date. Please try again.")
            user_date = input("Enter a valid date in the form of mm/dd/yyyy: ")       
        
    return (month,date,year)
    
def zeller(month,date,year):
    if month < 3:
        year = year - 1
        month = month + 10
    else:
        
        month = month - 2
    
    str_year = str(year)
    century = int(str_year[:2])
    year_century = int(year % 100)
    
    day_number = (((26*month) - 2)//10 + date + year_century + (year_century // 4) + (century // 4) + (5*century)) % 7
    
    return (day_number)

def print_date(day_number):
    days_name = ('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday')
    days_of_week = days_name[day_number]
    
    print ("The day of the given date is: ", days_of_week)
    
def main():
    month,date,year = get_valid_date()
    day_number = zeller(month,date,year)
    print_date(day_number)
    
main()
