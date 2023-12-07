import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

const OTPVerification = () => {
    const [code, setCode] = useState('');

    const handleChange = (code) => {
        setCode(code);
    };
    return (
        <div>
            <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                        <div class="flex flex-col items-center justify-center text-center space-y-2">
                            <div class="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div class="flex flex-row text-sm font-medium text-gray-400">
                                <p>
                                    We have sent a code to your email
                                    ba**@dipainhouse.com
                                </p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div class="flex flex-col space-y-16">
                                    <OtpInput
                                        value={code}
                                        onChange={handleChange}
                                        numInputs={8}
                                        separator={
                                            <span
                                                style={{ width: '8px' }}
                                            ></span>
                                        }
                                        isInputNum={true}
                                        shouldAutoFocus={true}
                                        inputStyle={{
                                            border: '1px solid transparent',
                                            borderRadius: '8px',
                                            width: '54px',
                                            height: '54px',
                                            fontSize: '12px',
                                            color: '#000',
                                            fontWeight: '400',
                                            caretColor: 'blue',
                                        }}
                                        focusStyle={{
                                            border: '1px solid #CFD3DB',
                                            outline: 'none',
                                        }}
                                    />

                                    <div class="flex flex-col space-y-5">
                                        <div>
                                            <button class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                                Verify Account
                                            </button>
                                        </div>

                                        <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p>{' '}
                                            <a
                                                class="flex flex-row items-center text-blue-600"
                                                href="http://"
                                                // target="_blank"
                                                // rel="noopener noreferrer"
                                            >
                                                Resend
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
