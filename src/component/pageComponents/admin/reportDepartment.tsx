import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
// import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { CoursesData } from '../../../utils/courses';
import { PrimaryButton } from '../../buttons/primaryButton';
import { useReportDepartment } from '../../../hooks/useReportDepartment';
import { jwtDecode } from 'jwt-decode';
import { Config } from '../../../config';

interface Props {
	department: string;
}

const AnalyticPage: React.FC<Props> = ({ department }) => {
	// let testTaken: number;

	const pagination = {
		current: 1,
		pageSize: 10,
		total: 0,
	};

	const [studentDetails, setStudentDetails] = useState<
		ReportDepartment.StudentDetails[] | []
	>([]);

	const [selectedStudentDetails, setSelectedStudentDetails] = useState<
		ReportDepartment.StudentDetails[] | []
	>([]);

	const { getReportDepartment } = useReportDepartment({
		course: department.toUpperCase(),
		page: pagination.current,
		limit: pagination.pageSize,
		status: '',
		// status: status as string,
	});

	const token = localStorage.getItem(Config.localStorageKeys.access_token);
	// let userRole = '';
	let userDetails = null;

	if (token) {
		try {
			const decodedToken: User.userDetails = jwtDecode(token);
			// userRole = decodedToken.role;
			userDetails = decodedToken; // Adjust as per your token structure
		} catch (error) {
			console.error('Error decoding token:', error);
		}
	}

	const findDepartment = CoursesData.find((course) => course.path === department);

	const columns: TableColumnsType<ReportDepartment.StudentDetails> = [
		{
			title: 'Student Name',
			dataIndex: 'studentName',
			key: 'studentName',
		},
		{
			title: 'Department',
			dataIndex: 'department',
			key: 'department',
		},
		{
			title: 'Registration Number',
			dataIndex: 'registrationNumber',
			key: 'registrationNumber',
		},
		{
			title: 'College Name',
			dataIndex: 'collegeName',
			key: 'collegeName',
		},
		{
			title: 'Tests Taken',
			dataIndex: 'testsTaken',
			key: 'testsTaken',
		},
		{
			title: 'Passed Count',
			dataIndex: 'passedCount',
			key: 'passedCount',
			// render: (testResults: ReportDepartment.TestResult[]) => (
			// 	<p>{testResults.filter((res) => res.pass).length}</p>
			// ),
		},
		{
			title: 'Failed Count',
			dataIndex: 'failedCount',
			key: 'failedCount',
			// render: (testResults: ReportDepartment.TestResult[]) => (
			// 	<p>{testTaken - testResults.filter((res) => res.pass).length}</p>
			// ),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (student: ReportDepartment.StudentDetails) => (
				<button
					className="w-full px-3 py-2 text-xs font-medium text-white rounded-md lg:text-base bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500"
					onClick={() => exportStudentAsPDF(student)}
				>
					Export PDF
				</button>
			),
		},
	];
	const exportStudentAsPDF = (student: ReportDepartment.StudentDetails) => {
		const doc = new jsPDF();

		// Add title with styling
		doc.setFontSize(18);
		doc.text('Student Report', 105, 10, { align: 'center' });

		// Add student details with design
		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0); // Black color

		// Highlighted Student Name
		doc.setFontSize(14);
		doc.setTextColor(0, 102, 204); // Change color for highlight
		doc.text(`Student: ${student.studentName}`, 10, 20);
		doc.setFontSize(12);
		doc.setTextColor(0, 0, 0); // Reset to black
		doc.text(`Department: ${student.department}`, 10, 30);
		doc.text(`Registration Number: ${student.registrationNumber}`, 10, 40);
		doc.text(`College: ${student.collegeName}`, 10, 50);

		// Add Assigned Person

		// Preparing test results data
		const tableData = student.testResults.map((test) => [
			test.testName,
			userDetails?.name,
			test.marks,
			formatTime(test.timeTaken), // Format the time taken
			test.pass ? 'Pass' : 'Fail', // Pass/Fail text
		]);

		// Padding configuration
		const cellPadding = 1; // Padding for the cell

		// Table with Pass/Fail buttons
		autoTable(doc, {
			head: [['Test Name', 'Assigned Person', 'Marks', 'Time Taken', 'Pass/Fail']],
			body: tableData as any,
			startY: 70,
			didDrawCell: function (data) {
				// Check if the column is the 'Pass/Fail' column (index 4)
				if (data.column.index === 4) {
					const value = data.cell.raw;

					// Adjusting cell's background considering the padding
					const cellX = data.cell.x + cellPadding; // X-coordinate with padding
					const cellY = data.cell.y + cellPadding; // Y-coordinate with padding
					const cellWidth = data.cell.width - 2 * cellPadding; // Width minus padding
					const cellHeight = data.cell.height - 2 * cellPadding; // Height minus padding

					// Simulate rounded corners with filled rectangles
					const radius = 3; // Border-radius value

					// Draw 'Pass' button (light green background with dark green text)
					if (value === 'Pass') {
						doc.setFillColor(204, 255, 204); // Light green background
						doc.roundedRect(
							cellX,
							cellY,
							cellWidth,
							cellHeight,
							radius,
							radius,
							'F',
						); // Draw rounded rectangle
						doc.setTextColor(0, 128, 0); // Dark green text for Pass
						doc.text(
							'Pass',
							data.cell.x + data.cell.width / 2,
							data.cell.y + data.cell.height / 2 + 1.5,
							{ align: 'center' },
						);
					}
					// Draw 'Fail' button (light red background with dark red text)
					else if (value === 'Fail') {
						doc.setFillColor(255, 204, 204); // Light red background
						doc.roundedRect(
							cellX,
							cellY,
							cellWidth,
							cellHeight,
							radius,
							radius,
							'F',
						); // Draw rounded rectangle
						doc.setTextColor(204, 0, 0); // Dark red text for Fail
						doc.text(
							'Fail',
							data.cell.x + data.cell.width / 2,
							data.cell.y + data.cell.height / 2 + 1.5,
							{ align: 'center' },
						);
					}
				}
			},
			headStyles: {
				fillColor: [20, 151, 125], // Teal-600 background color for header
				textColor: [255, 255, 255], // White text color for header
				halign: 'center', // Center align header text horizontally
				valign: 'middle', // Center align header text vertically
				fontSize: 12, // Font size for header
			},
			styles: {
				halign: 'center', // Center align data text horizontally
				valign: 'middle', // Center align data text vertically
				fontSize: 10,
			},
			theme: 'striped', // Optional theme
		});

		// Save the PDF with the student's name
		doc.save(`${student.studentName}-details.pdf`);
	};

	// Function to format time taken from seconds to HH:MM:SS
	const formatTime = (totalSeconds: any) => {
		const hours = Math.floor(totalSeconds / 3600);
		const minutes = Math.floor((totalSeconds % 3600) / 60);
		const seconds = totalSeconds % 60;

		return `${hours}h ${minutes}m ${seconds}s`;
	};

	const exportAllAsXLSX = () => {
		if (!studentDetails.length) return;

		let sheetData;

		if (selectedStudentDetails.length) {
			sheetData = selectedStudentDetails.map((student) => {
				return {
					'Student Name': student.studentName,
					Department: student.department,
					'Registration Number': student.registrationNumber,
					College: student.collegeName,
					'Total Tests': student.totalTest,
					'Tests Taken': student.testsTaken,
					'Passed Count': student.passedCount,
					'Failed Count': student.failedCount,
					'Test Details': student.testResults
						.map(
							(res) =>
								`${res.testName}: ${res.pass ? 'Pass' : 'Fail'} (Marks: ${
									res.marks
								}, Time: ${res.timeTaken})`,
						)
						.join(', '),
				};
			});
		} else {
			sheetData = studentDetails.map((student) => {
				return {
					'Student Name': student.studentName,
					Department: student.department,
					'Registration Number': student.registrationNumber,
					College: student.collegeName,
					'Total Tests': student.totalTest,
					'Tests Taken': student.testsTaken,
					'Passed Count': student.passedCount,
					'Failed Count': student.failedCount,
					'Test Details': student.testResults
						.map(
							(res) =>
								`${res.testName}: ${res.pass ? 'Pass' : 'Fail'} (Marks: ${
									res.marks
								}, Time: ${res.timeTaken})`,
						)
						.join(', '),
				};
			});
		}

		const ws = XLSX.utils.json_to_sheet(sheetData);
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Department Analytics');
		XLSX.writeFile(wb, 'department-analytics.xlsx');
	};

	// rowSelection object indicates the need for row selection
	const rowSelection: TableProps<ReportDepartment.StudentDetails>['rowSelection'] = {
		onChange: (
			selectedRowKeys: React.Key[],
			selectedRows: ReportDepartment.StudentDetails[],
		) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
			setSelectedStudentDetails(selectedRows);
		},
		getCheckboxProps: (record: ReportDepartment.StudentDetails) => ({
			disabled: record.studentName === 'Disabled User', // Column configuration not to be checked
			name: record.studentName,
		}),
	};

	useEffect(() => {
		setStudentDetails(
			getReportDepartment.data?.studentDetails as ReportDepartment.StudentDetails[],
		);
	}, [getReportDepartment.data, pagination]);
	console.log(getReportDepartment.data);
	return (
		<div className="flex flex-col w-full h-full gap-5 overflow-y-scroll rounded-lg md:p-5 overflow-x-clip">
			<div className="flex flex-col gap-3">
				<div className="flex justify-between w-full">
					<p className="text-lg font-semibold md:text-xl lg:text-2xl ">
						Department Analytics
					</p>
					<p className="hidden gap-2 text-xs font-semibold md:flex md:text-lg lg:text-2xl ">
						Department:{' '}
						<span className="text-transparent bg-text-gradient bg-clip-text">
							{findDepartment?.Abbreviation}
						</span>
					</p>
				</div>
				<div className="grid grid-cols-2 gap-3 rounded-lg lg:p-5 lg:bg-white lg:shadow-md md:grid-cols-3 xl:grid-cols-6">
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Total Students</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.totalStudents}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Pass Average</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.passAverage}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Fail Average</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.failAverage}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Total Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.totalTest}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Completed Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.totalCompletedTests}
						</p>
					</div>
					<div className="flex flex-col justify-center gap-1 px-4 py-3 border border-teal-600 rounded-md md:py-5 bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5">
						<p className="text-sm font-medium">Incomplete Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">
							{getReportDepartment.isLoading ? '...': getReportDepartment.data?.totalIncompleteTests}
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<div className="flex items-center justify-between w-full">
					<p className="text-lg font-semibold lg:text-2xl">Students Analytics</p>
					<PrimaryButton
						text="Export All as XLSX"
						className="rounded-md"
						onClick={exportAllAsXLSX}
					/>
				</div>
				<div className="bg-white rounded-lg shadow-lg ">
					<Table
						columns={columns}
						dataSource={studentDetails}
						rowKey="registrationNumber"
						className="border border-gray-300 rounded-lg"
						scroll={{ x: '100%' }}
						pagination={{
							...pagination,
							showSizeChanger: true, // Allows changing the page size
							pageSizeOptions: ['5', '10', '20', '50'], // Set the options for page size
							className:
								'custom-pagination flex justify-center px-16 md:px-5 py-2 item-center sticky',
						}}
						loading={
							getReportDepartment.isLoading ||
							getReportDepartment.isFetching ||
							getReportDepartment.isRefetching
						}
						rowSelection={{ type: 'checkbox', ...rowSelection }}
					/>
				</div>
			</div>
		</div>
	);
};

export default AnalyticPage;
