"use client";
import { Grid, Box } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import SalesOverview from "@/app/(DashboardLayout)/components/dashboard/SalesOverview";
import YearlyBreakup from "@/app/(DashboardLayout)/components/dashboard/YearlyBreakup";
import RecentTransactions from "@/app/(DashboardLayout)/components/dashboard/RecentTransactions";
import ProductPerformance from "@/app/(DashboardLayout)/components/dashboard/ProductPerformance";
import MonthlyEarnings from "@/app/(DashboardLayout)/components/dashboard/MonthlyEarnings";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
const router=useRouter();
const [loading, setLoading] = useState(true);

useEffect(()=>{
const checkAuthentication= async()=>{

  try{
    const response = await axios.get('/auth/checkAuth',{withCredentials:true})
    if (response.status !== 200) {
      router.push('/'); // Redirect if not authenticated
    }
  }
  catch(error){
    router.push('/'); // Redirect if not authenticated
  }
  finally{
    setLoading(false);
  }
}
checkAuthentication();
},[router])

if(loading) {return <div>Loading...</div>}

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
