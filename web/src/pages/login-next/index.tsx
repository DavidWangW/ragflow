import SvgIcon from '@/components/svg-icon';
import { useAuth } from '@/hooks/auth-hooks';
import {
  useLogin,
  useLoginChannels,
  useLoginWithChannel,
  useRegister,
} from '@/hooks/use-login-request';
import { useSystemConfig } from '@/hooks/use-system-request';
import { rsaPsw } from '@/utils';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import Spotlight from '@/components/spotlight';
import { Button, ButtonLoading } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  APP_NAME,
  APP_SUBTITLE,
  APP_TAGLINE,
  APP_TECH_LABEL,
} from '@/constants/branding';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BgSvg } from './bg';
import FlipCard3D, { FlipFaceContext } from './card';
import './index.less';

type LoginFormContentProps = {
  isLoginPage: boolean;
  title: string;
  form: ReturnType<typeof useForm>;
  loading: boolean;
  onCheck: (params: any) => Promise<void>;
  changeTitle: () => void;
  registerEnabled: boolean;
  channels: { channel: string; icon?: string; display_name: string }[];
  handleLoginWithChannel: (channel: string) => void;
  t: ReturnType<typeof useTranslation>['t'];
  disablePasswordLogin?: boolean;
};

const loginHighlights = ['统一知识接入', '研发资料沉淀', '智能问答协作'];

function LoginFormContent({
  isLoginPage,
  title,
  form,
  loading,
  onCheck,
  changeTitle,
  registerEnabled,
  channels,
  handleLoginWithChannel,
  t,
  disablePasswordLogin,
}: LoginFormContentProps) {
  const face = useContext(FlipFaceContext);
  const isActiveFace = isLoginPage ? face === 'front' : face === 'back';

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 h-px w-14 bg-[linear-gradient(90deg,rgba(77,103,255,0),rgba(77,103,255,0.9),rgba(77,103,255,0))]" />
        <h2 className="text-2xl font-semibold text-text-primary">
          {title === 'login' ? t('loginTitle') : t('signUpTitle')}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-text-secondary">
          {title === 'login'
            ? '进入统一知识工作台，继续你的研发资料检索、问答与协同流程。'
            : '创建账号后即可开始沉淀知识资产并开展智能协同。'}
        </p>
      </div>
      <div className="login-panel w-full max-w-[560px] rounded-[32px] px-7 pb-4 pt-11 shadow-[0_24px_80px_rgba(6,21,41,0.18)] md:px-10 md:pb-5 md:pt-12">
        {!disablePasswordLogin && (
          <Form {...form}>
            <form
              className="flex flex-col gap-8 text-text-primary "
              data-testid="auth-form"
              data-active={isActiveFace ? 'true' : undefined}
              onSubmit={form.handleSubmit(onCheck)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('emailLabel')}</FormLabel>
                    <FormControl>
                      <Input
                        data-testid="auth-email"
                        placeholder={t('emailPlaceholder')}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {title === 'register' && (
                <FormField
                  control={form.control}
                  name="nickname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel required>{t('nicknameLabel')}</FormLabel>
                      <FormControl>
                        <Input
                          data-testid="auth-nickname"
                          placeholder={t('nicknamePlaceholder')}
                          autoComplete="username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel required>{t('passwordLabel')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          data-testid="auth-password"
                          type={'password'}
                          placeholder={t('passwordPlaceholder')}
                          autoComplete={
                            title === 'login'
                              ? 'current-password'
                              : 'new-password'
                          }
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {title === 'login' && (
                <FormField
                  control={form.control}
                  name="remember"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex gap-2">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              field.onChange(checked);
                            }}
                          />
                          <FormLabel
                            className={cn(' hover:text-text-primary', {
                              'text-text-disabled': !field.value,
                              'text-text-primary': field.value,
                            })}
                          >
                            {t('rememberMe')}
                          </FormLabel>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <ButtonLoading
                data-testid="auth-submit"
                type="submit"
                loading={loading}
                className="my-8 h-12 w-full rounded-2xl border-b-2 border-b-[#00BEB4] bg-metallic-gradient text-sm font-semibold tracking-[0.02em] hover:border-b-[#02bcdd] hover:bg-metallic-gradient"
              >
                {title === 'login' ? t('login') : t('continue')}
              </ButtonLoading>
            </form>
          </Form>
        )}

        {title === 'login' && channels && channels.length > 0 && (
          <div
            className={
              disablePasswordLogin
                ? 'rounded-[24px] border border-border-button/80 bg-bg-card/40 p-4'
                : 'mt-3 rounded-[24px] border border-border-button/80 bg-bg-card/40 p-4'
            }
          >
            {channels.map((item) => (
              <Button
                variant={'transparent'}
                key={item.channel}
                onClick={() => handleLoginWithChannel(item.channel)}
                style={{ marginTop: 10 }}
                className={disablePasswordLogin ? 'w-full' : ''}
              >
                <div className="flex items-center">
                  <SvgIcon
                    name={item.icon || 'sso'}
                    width={20}
                    height={20}
                    style={{ marginRight: 5 }}
                  />
                  Sign in with {item.display_name}
                </div>
              </Button>
            ))}
          </div>
        )}

        {!disablePasswordLogin && title === 'login' && registerEnabled && (
          <div className="mt-10 text-right">
            <p className="text-text-disabled text-sm">
              {t('signInTip')}
              <Button
                data-testid="auth-toggle-register"
                variant={'transparent'}
                onClick={changeTitle}
                className="text-accent-primary/90 hover:text-accent-primary hover:bg-transparent font-medium border-none transition-colors duration-200"
              >
                {t('signUp')}
              </Button>
            </p>
          </div>
        )}
        {!disablePasswordLogin && title === 'register' && (
          <div className="mt-10 text-right">
            <p className="text-text-disabled text-sm">
              {t('signUpTip')}
              <Button
                data-testid="auth-toggle-login"
                variant={'transparent'}
                onClick={changeTitle}
                className="text-accent-primary/90 hover:text-accent-primary hover:bg-transparent font-medium border-none transition-colors duration-200"
              >
                {t('login')}
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const Login = () => {
  const [title, setTitle] = useState('login');
  const navigate = useNavigate();
  const { login, loading: signLoading } = useLogin();
  const { register, loading: registerLoading } = useRegister();
  const { channels, loading: channelsLoading } = useLoginChannels();
  const { login: loginWithChannel, loading: loginWithChannelLoading } =
    useLoginWithChannel();
  const { t } = useTranslation('translation', { keyPrefix: 'login' });
  const [isLoginPage, setIsLoginPage] = useState(true);

  const loading =
    signLoading ||
    registerLoading ||
    channelsLoading ||
    loginWithChannelLoading;
  const { config } = useSystemConfig();
  const registerEnabled = config?.registerEnabled !== 0;

  const { isLogin } = useAuth();
  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  const handleLoginWithChannel = async (channel: string) => {
    await loginWithChannel(channel);
  };

  const changeTitle = () => {
    setIsLoginPage(title !== 'login');
    if (title === 'login' && !registerEnabled) {
      return;
    }

    setTimeout(() => {
      setTitle(title === 'login' ? 'register' : 'login');
    }, 200);
  };

  const FormSchema = z
    .object({
      nickname: z.string(),
      email: z
        .string()
        .email()
        .min(1, { message: t('emailPlaceholder') }),
      password: z.string().min(1, { message: t('passwordPlaceholder') }),
      remember: z.boolean().optional(),
    })
    .superRefine((data, ctx) => {
      if (title === 'register' && !data.nickname) {
        ctx.addIssue({
          path: ['nickname'],
          message: 'nicknamePlaceholder',
          code: z.ZodIssueCode.custom,
        });
      }
    });
  const form = useForm({
    defaultValues: {
      nickname: '',
      email: '',
      password: '',
      confirmPassword: '',
      remember: false,
    },
    resolver: zodResolver(FormSchema),
  });

  const onCheck = async (params: z.infer<typeof FormSchema>) => {
    try {
      const rsaPassWord = rsaPsw(params.password) as string;

      if (title === 'login') {
        const code = await login({
          email: `${params.email}`.trim(),
          password: rsaPassWord,
        });
        if (code === 0) {
          navigate('/');
        }
      } else {
        const code = await register({
          nickname: params.nickname,
          email: params.email,
          password: rsaPassWord,
        });
        if (code === 0) {
          setTitle('login');
        }
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <>
      <Spotlight opcity={0.4} coverage={60} color={'rgb(128, 255, 248)'} />
      <Spotlight
        opcity={0.3}
        coverage={12}
        X={'10%'}
        Y={'-10%'}
        color={'rgb(128, 255, 248)'}
      />
      <Spotlight
        opcity={0.3}
        coverage={12}
        X={'90%'}
        Y={'-10%'}
        color={'rgb(128, 255, 248)'}
      />
      <div className=" h-[inherit] relative overflow-auto">
        <BgSvg isPaused />

        <div className="absolute inset-x-0 top-0 z-20 px-4 pt-4 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-[1320px] text-text-primary">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-center">
                <div className="brand-mark mr-4 flex h-14 w-14 items-center justify-center p-2">
                  <img
                    src={'/logo.svg'}
                    alt={APP_NAME}
                    className="size-8 cursor-pointer"
                  />
                </div>
                <div className="login-branding">
                  <div className="brand-title text-xl">{APP_NAME}</div>
                  <div className="brand-subtitle hidden md:block">
                    {APP_SUBTITLE}
                  </div>
                </div>
              </div>

              <div className="hidden flex-wrap items-center justify-end gap-2 xl:flex">
                {loginHighlights.map((item) => (
                  <span key={item} className="info-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center text-center">
              <div className="lab-badge mb-4 w-fit">{APP_TECH_LABEL}</div>
              <h1 className="max-w-4xl text-[38px] font-semibold leading-tight md:text-[3.4rem]">
                <span className="text-text-primary">欢迎进入 </span>
                <span className="page-title-gradient">{APP_NAME}</span>
              </h1>
              <p className="mt-4 max-w-3xl px-6 text-center text-base leading-7 text-text-secondary">
                {APP_TAGLINE}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 px-4 xl:hidden">
                {loginHighlights.map((item) => (
                  <span key={item} className="info-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative z-10 flex min-h-[980px] flex-col items-center justify-start px-4 pb-16 pt-[320px] sm:px-6 md:pt-[340px] lg:px-8 lg:pt-[380px]">
          {/* Login Form */}
          <FlipCard3D isLoginPage={isLoginPage}>
            <LoginFormContent
              isLoginPage={isLoginPage}
              title={title}
              form={form}
              loading={loading}
              onCheck={onCheck}
              changeTitle={changeTitle}
              registerEnabled={registerEnabled}
              channels={channels || []}
              handleLoginWithChannel={handleLoginWithChannel}
              t={t}
              disablePasswordLogin={!!config?.disablePasswordLogin}
            />
          </FlipCard3D>
        </div>
      </div>
    </>
  );
};

export default Login;
