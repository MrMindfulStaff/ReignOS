declare module 'react-mailchimp-subscribe' {
  export interface MailchimpFormProps {
    EMAIL: string;
    FNAME?: string;
    COMPANY?: string;
    [key: string]: any;
  }

  export interface MailchimpResponse {
    result: 'success' | 'error';
    msg: string;
  }

  export interface RenderProps {
    subscribe: (data: MailchimpFormProps) => void;
    status: 'sending' | 'error' | 'success' | null;
    message: string | Error | null;
  }

  export interface MailchimpSubscribeProps {
    url: string;
    render: (props: RenderProps) => React.ReactNode;
  }

  export default function MailchimpSubscribe(
    props: MailchimpSubscribeProps
  ): JSX.Element;
}

