import React, { useEffect, useState } from 'react';
import { Table, TableColumnsType, TableProps } from 'antd';
// import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
import { CoursesData } from '../../../utils/courses';
import { PrimaryButton } from '../../buttons/primaryButton';
import { useReportDepartment } from '../../../hooks/useReportDepartment';

interface Props {
	department: string;
}

const AnalyticPage: React.FC<Props> = ({ department }) => {
	// const [analytics, setAnalytics] = useState<DepartmentAnalytics | null>(null);
	// const [testTaken, setTestTaken] = useState<number>(0);

	let testTaken: number;

	// const [pagination, setPagination] = useState({
	// 	current: 1,
	// 	pageSize: 10,
	// 	total: 0,
	// });
	const pagination = {
		current: 1,
		pageSize: 10,
		total: 0,
	};

	// const [page, setPage] = useState<string | number>(1);
	// const [limit, setLimit] = useState<string | number>(25);
	// const [status, setStatus] = useState<string | null>(null);

	const [studentDetails, setStudentDetails] = useState<
		ReportDepartment.StudentDetails[] | []
	>([]);
	// const [loading, setLoading] = useState<boolean>(true);
	// const token = localStorage.getItem('token');
	// const headers = { Authorization: `Bearer ${token}` };

	const { getReportDepartment } = useReportDepartment({
		course: department.toUpperCase(),
		page: pagination.current,
		limit: pagination.pageSize,
		status: '',
		// status: status as string,
	});

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
			title: 'Passed',
			dataIndex: 'testResults',
			key: 'testResults',
			render: (testResults: ReportDepartment.TestResult[]) => (
				<p>{testResults.filter((res) => res.pass).length}</p>
			),
		},
		{
			title: 'Failed',
			dataIndex: 'testResults',
			key: 'testResults',
			render: (testResults: ReportDepartment.TestResult[]) => (
				<p>{testTaken - testResults.filter((res) => res.pass).length}</p>
			),
		},
		{
			title: 'Actions',
			key: 'actions',
			render: (student: ReportDepartment.StudentDetails) => (
				<button
					className="py-2 px-3 w-full font-medium text-white rounded-md text-xs lg:text-base bg-gradient-to-br from-teal-700 to-teal-500 hover:from-teal-800 hover:to-teal-500"
					onClick={() => exportStudentAsPDF(student)}
				>
					Export PDF
				</button>
			),
		},
	];

	const exportStudentAsPDF = (student: ReportDepartment.StudentDetails) => {
		const doc = new jsPDF();
		doc.text(`Student: ${student.studentName}`, 10, 10);
		doc.text(`Department: ${student.department}`, 10, 20);
		doc.text(`Registration Number: ${student.registrationNumber}`, 10, 30);
		doc.text(`College: ${student.collegeName}`, 10, 40);

		const tableData = student.testResults.map((test) => [
			test.testName,
			test.pass ? 'Pass' : 'Fail',
			test.marks,
			test.timeTaken,
		]);

		autoTable(doc, {
			head: [['Test Name', 'Pass/Fail', 'Marks', 'Time Taken']],
			body: tableData,
			startY: 50,
		});

		doc.save(`${student.studentName}-details.pdf`);
	};

	// const exportAllAsCSV = () => {
	// 	if (!analytics) return;

	// 	const csvData = analytics.studentDetails.map((student) => {
	// 		return {
	// 			studentName: student.studentName,
	// 			department: student.department,
	// 			registrationNumber: student.registrationNumber,
	// 			collegeName: student.collegeName,
	// 			testsTaken: student.testsTaken,
	// 			passedCount: student.testResults.filter((res) => res.pass).length,
	// 			failedCount:
	// 				student.testsTaken - student.testResults.filter((res) => res.pass).length,
	// 			testDetails: student.testResults
	// 				.map(
	// 					(res) =>
	// 						`${res.testName}: ${res.pass ? 'Pass' : 'Fail'} (Marks: ${
	// 							res.marks
	// 						}, Time: ${res.timeTaken})`,
	// 				)
	// 				.join(', '),
	// 		};
	// 	});

	// 	const csvRows = [
	// 		[
	// 			'Student Name',
	// 			'Department',
	// 			'Registration Number',
	// 			'College Name',
	// 			'Tests Taken',
	// 			'Passed',
	// 			'Failed',
	// 			'Test Details',
	// 		],
	// 		...csvData.map((row) => [
	// 			row.studentName,
	// 			row.department,
	// 			row.registrationNumber,
	// 			row.collegeName,
	// 			row.testsTaken,
	// 			row.passedCount,
	// 			row.failedCount,
	// 			row.testDetails,
	// 		]),
	// 	];

	// 	const csvContent = csvRows.map((row) => row.join(',')).join('\n');
	// 	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	// 	saveAs(blob, 'department-analytics.csv');
	// };

	// const exportAllAsXLSX = () => {
	// 	if (!analytics) return;

	// 	const sheetData = analytics.studentDetails.map((student) => {
	// 		return {
	// 			'Student Name': student.studentName,
	// 			Department: student.department,
	// 			'Registration Number': student.registrationNumber,
	// 			College: student.collegeName,
	// 			'Tests Taken': student.testsTaken,
	// 			'Passed Count': student.testResults.filter((res) => res.pass).length,
	// 			'Failed Count':
	// 				student.testsTaken - student.testResults.filter((res) => res.pass).length,
	// 			'Test Details': student.testResults
	// 				.map(
	// 					(res) =>
	// 						`${res.testName}: ${res.pass ? 'Pass' : 'Fail'} (Marks: ${
	// 							res.marks
	// 						}, Time: ${res.timeTaken})`,
	// 				)
	// 				.join(', '),
	// 		};
	// 	});

	// 	const ws = XLSX.utils.json_to_sheet(sheetData);
	// 	const wb = XLSX.utils.book_new();
	// 	XLSX.utils.book_append_sheet(wb, ws, 'Department Analytics');
	// 	XLSX.writeFile(wb, 'department-analytics.xlsx');
	// };

	// rowSelection object indicates the need for row selection
	const rowSelection: TableProps<ReportDepartment.StudentDetails>['rowSelection'] = {
		onChange: (
			selectedRowKeys: React.Key[],
			selectedRows: ReportDepartment.StudentDetails[],
		) => {
			console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
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
	// useEffect(() => {
	// 	axios
	// 		.get(
	// 			`https://quiz-server-sigma.vercel.app/responses/analytics/department/${department}`,
	// 			{ headers },
	// 		)
	// 		.then((response) => {
	// 			setAnalytics(response.data);
	// 			setStudentDetails(response?.data?.studentDetails);
	// 			setTestTaken(response?.data?.totalTestsTaken);
	// 			setLoading(false);
	// 		})
	// 		.catch((error) => {
	// 			console.error('Error fetching analytics:', error);
	// 			setLoading(false);
	// 		});
	// }, [department]);

	return (
		<div className="flex flex-col w-full h-full gap-5 rounded-lg md:p-5 overflow-y-scroll overflow-x-clip">
			<div className="flex flex-col gap-3">
				<div className="w-full flex justify-between">
					<p className="text-lg md:text-xl lg:text-2xl font-semibold ">
						Department Analytics
					</p>
					<p className="hidden md:flex gap-2 text-xs md:text-lg lg:text-2xl font-semibold ">
						Department:{' '}
						<span className="bg-text-gradient bg-clip-text text-transparent">
							{findDepartment?.Abbreviation}
						</span>
					</p>
				</div>
				<div className="lg:p-5 lg:bg-white rounded-lg lg:shadow-md grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Total Students</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Pass Average</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Fail Average</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Total Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Completed Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
					<div className="flex flex-col px-4 py-3 md:py-5 gap-1 justify-center bg-gradient-to-br from-teal-600/30 via-teal-600/20 to-teal-600/5 rounded-md">
						<p className="text-sm font-medium">Incomplete Assessment</p>
						<p className="text-3xl font-semibold text-teal-600">12</p>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-5">
				<div className="w-full flex justify-between items-center">
					<p className="text-lg font-semibold lg:text-2xl">Students Analytics</p>
					<PrimaryButton text="Export All as XLSX" className="rounded-md" />
				</div>
				<div className=" bg-white rounded-lg shadow-lg">
					<Table
						columns={columns}
						dataSource={studentDetails}
						rowKey="registrationNumber"
						className='border border-gray-300 rounded-lg'
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
