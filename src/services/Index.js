export const gettextData = () => {
    return new Promise((resolve) => {
        resolve([
            { title: "What is SGPA?", description: "Assessing academic achievement is an important part of higher education, especially in universities and colleges. Calculating grade point averages (GPA), of which semester grade point average (SGPA) is a key subset, is one of the ways frequently used to assess student performance. The SGPA gives an overview of a student’s academic performance over the course of a given semester and provides information about their level of knowledge and advancement. The goal of this essay is to explain the computation, importance, and use of the SGPA idea in great detail." },
            { title: "Understanding the Fundamentals", description: 'A student’s performance in a single academic semester is assessed using a metric called the semester grade point average, or SGPA. It is determined by taking into account both the corresponding grades earned in those courses as well as the credit hours or course units of each specific course completed during the semester. Compared to the Cumulative Grade Point Average (CGPA), which averages a student’s performance over several semesters, the Student Grade Point Average (SGPA) provides a more narrow perspective.' },
            { title: "Calculation of SGPA:", description: "" },
            { title: "Assigning Grades and Grade Points:", description: "At the end of each course, students are assigned letter grades based on their performance. These grades typically range from A to F, with each grade representing a specific level of achievement. Alongside each letter grade, there is an associated grade point, which is a numerical representation of the grade’s quality." },
            {
                title: "Assigning Grades and Grade Points:", description: "For each course, grade points are determined by multiplying the letter grade’s grade points by the course’s credit hours.  Consider a student who enrols in three classes during a semester and has the following information:       Grade: B, credit hours: 3, in course 1.Course 2: A grade, 4 credits earned.Grade of C, 2 credit hours for Course 3.The number of grade points for every course would be:Course 1: 3 credit hours (3 grade points for a B) = 9 Course 2: 4 credit hours * 4 grade points for an A = 16             Course 3: 4 (Credit Hours x 2 (Grade Points for C) = 4 "
            },
            { title: "Calculating Total Credit Hours and Total Grade Points:", description: "The total credit hours and total grade points earned in the semester are obtained by summing up the credit hours and grade points for all courses.Total Credit Hours = 3 + 4 + 2 = 9  => Total Grade Points = 9 + 16 + 4 = 29" },
            { title: "Calculating SGPA:", description: "Finally, the SGPA is calculated by dividing the total grade points earned by the total credit hours.SGPA = Total Grade Points / Total Credit Hours SGPA = 29 / 9 ≈ 3.22" },
            { title: "Significance of SGPA:", description: "SGPA holds several significant implications for students, educators, and institutions alike:" },
            { title: "", description: "In the context of academic assessment, a student’s performance throughout a particular semester is evaluated in large part by their Semester Grade Point Average (SGPA). The SGPA system entails distributing grades and grade points, figuring out the grade points gained for each course, totaling the credit hours and grade points, and then calculating the SGPA itself. The SGPA provides information about course selection, academic status, and institutional evaluation in addition to reflecting the performance of each individual student. We have seen how the SGPA is determined and its importance in gauging academic achievement through real-world instances. The SGPA is still an essential instrument for comprehending and improving academic achievements as long as students and institutions continue to strive for excellence." }

        ]);
    });
};
