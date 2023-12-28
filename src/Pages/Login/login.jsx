import {
    Card,
    Button,
    Typography, Input,
} from "@material-tailwind/react";
const Login = () => {

  return(
      <>
          <Card color="white" className="p-6" shadow={false}>
      <Typography variant="h4" color="blue-gray">
          Sign In
      </Typography>

      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3 text-left">
                  Your Phone Number
              </Typography>
              <Input
                  size="lg"
                  placeholder="Số điện thoại"
                  className=" !border-t-blue-gray-200 "
                  labelProps={{
                      className: "before:content-none after:content-none",
                  }}
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3 text-left">
                  Password
              </Typography>
              <Input
                  type="password"
                  size="lg"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 "
                  labelProps={{
                      className: "before:content-none after:content-none",
                  }}
              />
          </div>

          {/*<div*/}
          {/*    color="gray"*/}
          {/*    className="flex text-sm items-center font-normal">*/}
          {/*    <Checkbox className="flex"/>*/}
          {/*    I agree the*/}
          {/*    <a*/}
          {/*        href="#"*/}
          {/*        className="font-medium transition-colors hover:text-gray-900"*/}
          {/*    >*/}
          {/*        &nbsp;Terms and Conditions*/}
          {/*    </a>*/}
          {/*</div>*/}

          <Button className="mt-6 bg-black" fullWidth>
              Đăng nhập
          </Button>
      </form>
      </Card>
      </>
  )
}
export default Login
