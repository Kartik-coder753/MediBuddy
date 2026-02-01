import React, { useState } from 'react';
import { FileText, Download, Filter, Calendar, Search } from 'lucide-react';

const DoctorReports = () => {
  const [selectedReport, setSelectedReport] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reports = [
    {
      id: 1,
      title: 'Monthly Patient Statistics',
      type: 'statistics',
      date: '2025-04-01',
      description: 'Detailed analysis of patient visits, treatments, and outcomes for March 2025',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Quarterly Revenue Report',
      type: 'financial',
      date: '2025-04-15',
      description: 'Financial overview including consultations, procedures, and other services',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Treatment Success Rates',
      type: 'medical',
      date: '2025-04-10',
      description: 'Analysis of treatment effectiveness and patient recovery rates',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Patient Satisfaction Survey',
      type: 'feedback',
      date: '2025-04-05',
      description: 'Summary of patient feedback and satisfaction metrics',
      status: 'completed'
    }
  ];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedReport === 'all' || report.type === selectedReport;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports</h1>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FileText className="h-5 w-5 mr-2" />
          Generate New Report
        </button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedReport('all')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedReport === 'all'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            All Reports
          </button>
          <button
            onClick={() => setSelectedReport('statistics')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedReport === 'statistics'
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Statistics
          </button>
          <button
            onClick={() => setSelectedReport('financial')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedReport === 'financial'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Financial
          </button>
          <button
            onClick={() => setSelectedReport('medical')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedReport === 'medical'
                ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Medical
          </button>
          <button
            onClick={() => setSelectedReport('feedback')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              selectedReport === 'feedback'
                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            Feedback
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search reports..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{report.title}</h3>
                <div className="flex items-center mt-2">
                  <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">{report.date}</span>
                </div>
              </div>
              <div className="mt-4 sm:mt-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    report.status === 'completed'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                  }`}
                >
                  {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                </span>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">{report.description}</p>

            <div className="flex justify-end space-x-3">
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                View Details
              </button>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorReports;