import { v4 as uuidv4 } from 'uuid';

export const mockUsers = [
  {
    id: "d1",
    name: "Dr. Gaurav Sharma",
    email: "gaurav@example.com",
    password: "gaurav123",
    userType: "doctor",
    specialty: "Cardiologist",
    experience: "12 years",
    qualifications: "MD, DM Cardiology",
    profilePicture: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg",
    bio: "Senior Cardiologist at Apollo Hospitals. Specialized in interventional cardiology and preventive cardiac care.",
    rating: 4.8,
    reviewCount: 127,
    address: "Apollo Hospitals, Sector 26, Noida, UP - 201301",
    phone: "+91 98765 43210"
  },
  {
    id: "d2",
    name: "Dr. Kartik Verma",
    email: "kartik@example.com", 
    password: "kartik123",
    userType: "doctor",
    specialty: "Neurologist",
    experience: "10 years",
    qualifications: "MD, DM Neurology",
    profilePicture: "https://images.pexels.com/photos/5452290/pexels-photo-5452290.jpeg",
    bio: "Consultant Neurologist at Max Healthcare. Expert in stroke management and neurodegenerative disorders.",
    rating: 4.9,
    reviewCount: 93,
    address: "Max Super Speciality Hospital, Saket, New Delhi - 110017",
    phone: "+91 98765 43211"
  },
  {
    id: "d3",
    name: "Dr. Kulmeet Singh",
    email: "kulmeet@example.com",
    password: "kulmeet123",
    userType: "doctor",
    specialty: "Orthopedic Surgeon",
    experience: "15 years",
    qualifications: "MS Ortho, Fellowship in Joint Replacement",
    profilePicture: "https://images.pexels.com/photos/5452223/pexels-photo-5452223.jpeg",
    bio: "Director of Orthopedics at Fortis Hospital. Specializes in joint replacement and sports medicine.",
    rating: 4.7,
    reviewCount: 89,
    address: "Fortis Hospital, Gurugram, Haryana - 122002",
    phone: "+91 98765 43212"
  },
  {
    id: "d4",
    name: "Dr. Divyansh Kumar",
    email: "divyansh@example.com",
    password: "divyansh123",
    userType: "doctor",
    specialty: "Pediatrician",
    experience: "8 years",
    qualifications: "MD Pediatrics, Fellowship in Neonatology",
    profilePicture: "https://images.pexels.com/photos/5452238/pexels-photo-5452238.jpeg",
    bio: "Consultant Pediatrician at Medanta Hospital. Expert in pediatric care and child development.",
    rating: 4.9,
    reviewCount: 156,
    address: "Medanta - The Medicity, Gurugram, Haryana - 122001",
    phone: "+91 98765 43213"
  },
  {
    id: "p1",
    name: "Rahul Mehta",
    email: "rahul@example.com",
    password: "rahul123",
    userType: "patient",
    age: 35,
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    profilePicture: "https://images.pexels.com/photos/1270076/pexels-photo-1270076.jpeg",
    medicalHistory: "Hypertension, Asthma",
    emergencyContact: "Priya Mehta (Wife) - +91 98765 43214",
    address: "C-42, Vasant Kunj, New Delhi - 110070"
  },
  {
    id: "p2",
    name: "Amit Patel",
    email: "amit@example.com",
    password: "amit123",
    userType: "patient",
    age: 42,
    bloodType: "A-",
    allergies: ["Sulfa drugs", "Shellfish"],
    profilePicture: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    medicalHistory: "Diabetes Type 2, Migraines",
    emergencyContact: "Neha Patel (Wife) - +91 98765 43215",
    address: "204, Shivalik Apartments, Ahmedabad, Gujarat - 380015"
  },
  {
    id: "p3",
    name: "Vikram Singh",
    email: "vikram@example.com",
    password: "vikram123",
    userType: "patient",
    age: 28,
    bloodType: "B+",
    allergies: ["Latex", "Dairy"],
    profilePicture: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
    medicalHistory: "Sports injuries, Seasonal allergies",
    emergencyContact: "Rajesh Singh (Father) - +91 98765 43216",
    address: "E-15, Gomti Nagar, Lucknow, UP - 226010"
  }
];

// Updated appointments with Indian context
export const mockAppointments = [
  {
    id: uuidv4(),
    patientId: "p1",
    doctorId: "d1",
    patientName: "Rahul Mehta",
    doctorName: "Dr. Gaurav Sharma",
    date: "2025-05-10",
    time: "09:30 AM",
    status: "confirmed",
    type: "Cardiac Checkup",
    symptoms: "Chest pain, shortness of breath",
    notes: "Patient reports occasional chest pain after physical activity.",
    virtualMeeting: "https://meet.example.com/dr-sharma-123"
  },
  {
    id: uuidv4(),
    patientId: "p2",
    doctorId: "d2",
    patientName: "Amit Patel",
    doctorName: "Dr. Kartik Verma",
    date: "2025-05-15",
    time: "11:00 AM",
    status: "pending",
    type: "Neurology Consultation",
    symptoms: "Frequent headaches, dizziness",
    notes: "Follow-up for migraine treatment",
    virtualMeeting: "https://meet.example.com/dr-verma-456"
  },
  {
    id: uuidv4(),
    patientId: "p3",
    doctorId: "d3",
    patientName: "Vikram Singh",
    doctorName: "Dr. Kulmeet Singh",
    date: "2025-05-12",
    time: "02:15 PM",
    status: "confirmed",
    type: "Orthopedic Follow-up",
    symptoms: "Knee pain post physiotherapy",
    notes: "Review of rehabilitation progress",
    virtualMeeting: "https://meet.example.com/dr-singh-789"
  }
];

// Updated medical records with Indian context
export const mockMedicalRecords = [
  {
    id: uuidv4(),
    patientId: "p1",
    date: "2025-01-15",
    doctorId: "d1",
    doctorName: "Dr. Gaurav Sharma",
    diagnosis: "Hypertension Stage 1",
    symptoms: "Elevated blood pressure, occasional headaches",
    treatment: "Prescribed Amlodipine 5mg daily",
    notes: "Patient advised to monitor BP daily and maintain log",
    followUp: "1 month"
  },
  {
    id: uuidv4(),
    patientId: "p2",
    date: "2025-02-10",
    doctorId: "d2",
    doctorName: "Dr. Kartik Verma",
    diagnosis: "Chronic Migraine",
    symptoms: "Severe headaches with aura",
    treatment: "Started on Propranolol 40mg",
    notes: "Recommended lifestyle modifications and stress management",
    followUp: "2 weeks"
  },
  {
    id: uuidv4(),
    patientId: "p3",
    date: "2025-03-01",
    doctorId: "d3",
    doctorName: "Dr. Kulmeet Singh",
    diagnosis: "Meniscal Tear",
    symptoms: "Right knee pain and swelling",
    treatment: "Prescribed physiotherapy and knee brace",
    notes: "MRI shows grade 2 tear, conservative management planned",
    followUp: "2 weeks"
  }
];

// Updated medications with Indian pharmaceutical names
export const mockMedications = [
  {
    id: uuidv4(),
    patientId: "p1",
    name: "Amlodipine",
    dosage: "5mg",
    frequency: "Once daily",
    prescribedBy: "Dr. Gaurav Sharma",
    prescribedDate: "2025-01-15",
    endDate: "2025-07-15",
    instructions: "Take after breakfast",
    purpose: "Blood pressure control",
    sideEffects: "Ankle swelling, headache"
  },
  {
    id: uuidv4(),
    patientId: "p2",
    name: "Propranolol",
    dosage: "40mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. Kartik Verma",
    prescribedDate: "2025-02-10",
    endDate: "2025-08-10",
    instructions: "Take with meals",
    purpose: "Migraine prevention",
    sideEffects: "Fatigue, cold hands"
  },
  {
    id: uuidv4(),
    patientId: "p3",
    name: "Aceclofenac",
    dosage: "100mg",
    frequency: "Twice daily",
    prescribedBy: "Dr. Kulmeet Singh",
    prescribedDate: "2025-03-01",
    endDate: "2025-03-15",
    instructions: "Take after food",
    purpose: "Pain and inflammation relief",
    sideEffects: "Gastric irritation"
  }
];

export const availableTimeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

export const getTodayPlus = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
};