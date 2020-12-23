export const ok = (data: any, message: string) => ({
  status: '000',
  message: message || 'Success',
  data
});