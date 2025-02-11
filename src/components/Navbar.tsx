import React from 'react';
import MaxWidthWrapper from './MaxWidthWrapper';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession, LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const isAdmin = user?.email === process.env.ADMIN_EMAIL;
    return (
        <nav className='text-2xl sticky z-[100] h-14 inset-x-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
            <MaxWidthWrapper>
                <div className="flex h-14 items-center justify-between border-b border-zinc-200">
                    <Link href="/" className='flex z-40 font-semibold'>
                        case<span className='text-green-600'>cobra</span>
                    </Link>
                    <div className="h-full flex items-center space-x-4">
                        {user ? (
                            <>
                                <LogoutLink className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                                    Sign Out
                                </LogoutLink>
                                {isAdmin ? (
                                    <Link href="/dashboard" className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                                        Admin Dashboard ✨
                                    </Link>
                                ) : null}
                                <Link href="/configure/upload" className={buttonVariants({ size: 'sm', className: "hidden sm:flex items-center gap-1" })}>
                                    Create Case
                                    <ArrowRight className='h-5 w-5 ml-1.5' />
                                </Link>
                            </>
                        ) : (
                            <>
                                <RegisterLink className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                                    Sign Up
                                </RegisterLink>
                                <LoginLink className={buttonVariants({ size: 'sm', variant: 'ghost' })}>
                                    Login
                                    <ArrowRight className='h-5 w-5 ml-1.5' />
                                </LoginLink>
                                <div className='h-8 bg-zinc-200 hidden sm:block' />
                                <Link href="/configure/upload" className={buttonVariants({ size: 'sm', className: "hidden sm:flex items-center gap-1" })}>
                                    Create Case
                                    <ArrowRight className='h-5 w-5 ml-1.5' />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
