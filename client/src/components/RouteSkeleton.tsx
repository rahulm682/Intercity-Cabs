import { Card, CardContent, Skeleton, Stack, Box } from "@mui/material";

const RouteSkeleton = () => {
  return (
    <Card sx={{ height: "100%", borderRadius: 3 }}>
      <Skeleton variant="rectangular" height={160} width="100%" />

      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={2}>
          <Skeleton variant="text" width="40%" height={32} />
          <Skeleton variant="circular" width={20} height={20} />
          <Skeleton variant="text" width="40%" height={32} />
        </Stack>

        <Stack direction="row" spacing={1} mb={2}>
          <Skeleton variant="rounded" width={80} height={24} />
          <Skeleton variant="rounded" width={50} height={24} />
        </Stack>

        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="60%" />

        <Box
          sx={{
            mt: 3,
            pt: 2,
            borderTop: "1px solid #eee",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Skeleton variant="text" width={60} />
            <Skeleton variant="text" width={80} height={30} />
          </Box>
          <Skeleton variant="rounded" width={90} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default RouteSkeleton;
